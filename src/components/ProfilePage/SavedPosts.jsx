// src/components/SavedFeed/SavedPosts.jsx
import React, { useEffect, useState, useMemo } from "react";
import FeedPost from "../FeedPosts/FeedPost";
import { API_BASE } from "../../api/http";
import { listSaved, unsavePost } from "../../api/saved";

/** 안전한 이미지 url 변환 */
const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

/** SavedPosts 컴포넌트 */
function SavedPosts({ token } = {}) {
  const [savedItems, setSavedItems] = useState([]); // 원본 saved list
  const [posts, setPosts] = useState([]); // normalized post objects
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const saved = await listSaved({ token });
        if (cancelled) return;
        setSavedItems(saved || []);

        // normalize saved -> posts
        const normalized = await Promise.all((saved || []).map(async (s) => {
          // 1) if wrapper contains full post object
          if (s.post) return normalizePost(s.post);
          // 2) if saved item itself looks like a post
          if (s.id || s.postId || s.content || s.image) return normalizePost(s);
          // 3) if only postId available -> fetch single post
          const id = s.postId ?? s.post_id ?? s.id ?? null;
          if (id) {
            try {
              const r = await fetch(`${API_BASE}/api/v1/saved/${encodeURIComponent(id)}`, {
                headers: { Accept: "application/json" },
                credentials: token ? "omit" : "include",
              });
              if (!r.ok) return null;
              const data = await r.json();
              return normalizePost(data);
            } catch (e) {
              console.warn("Failed to fetch post for saved id", id, e);
              return null;
            }
          }
          return null;
        }));

        if (!cancelled) {
          setPosts(normalized.filter(Boolean));
        }
      } catch (e) {
        console.error("SavedPosts load error:", e);
        if (!cancelled) setErr(e.message || "Failed to load saved posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function normalizePost(p) {
    return {
      postId: p.postId ?? p.id ?? p.post_id ?? null,
      image: p.image ?? p.imageUrl ?? p.img ?? null,
      userId: p.userId ?? p.username ?? p.author ?? null,
      content: p.content ?? p.body ?? "",
      createdAt: p.createdAt ?? p.created_at ?? p.createdDate ?? null,
      likes: p.likes ?? p.likeCount ?? 0,
      comments: p.comments ?? p.commentCount ?? 0,
    };
  }

  const postsSorted = useMemo(() => {
    return [...posts].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });
  }, [posts]);

  const handleUnsave = async (postId) => {
    // optimistic UI: remove immediately
    const prev = posts;
    setPosts((p) => p.filter((x) => x.postId !== postId));
    try {
      await unsavePost(postId, { token });
    } catch (e) {
      console.error("unsave failed:", e);
      setPosts(prev); // rollback
      alert("저장 해제 실패: " + (e.message || ""));
    }
  };

  if (loading) return <div className="savedposts-container">로딩 중...</div>;
  if (err) return <div className="savedposts-container">불러오지 못했습니다. ({err})</div>;
  if (!postsSorted.length) return <div className="savedposts-container">저장한 게시물이 없습니다.</div>;

  return (
    <div className="savedposts-container">
      {postsSorted.map((p) => (
        <FeedPost
          key={p.postId}
          img={toImageUrl(p.image)}
          username={p.userId || "unknown"}
          avatar={`${API_BASE}/avatars/${p.userId || "default"}.png`}
          content={p.content}
          createdAt={p.createdAt}
          initialLikes={p.likes}
          commentCount={p.comments}
          isSaved={true}
          onToggleSave={() => handleUnsave(p.postId)}
        />
      ))}
    </div>
  );
}

export default SavedPosts;
