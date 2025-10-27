import React, { useEffect, useState, useMemo } from "react";
import FeedPost from "./FeedPost";
import "../../styles/FeedPosts.css";
import { API_BASE } from "../../api/http";
import { listSaved, savePost, unsavePost } from "../../api/saved";

const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

function FeedPosts({ token } = {}) {
  const [posts, setPosts] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const url = `${API_BASE}/api/v1/posts`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          credentials: token ? "omit" : "include",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
        }

        const data = await res.json();

        let arr = [];
        if (Array.isArray(data)) arr = data;
        else if (data && Array.isArray(data.content)) arr = data.content;

        const normalized = arr.map((p) => ({
          postId: p.postId ?? p.id ?? p.post_id,
          image: p.image ?? p.imageUrl ?? p.img,
          userId: p.userId ?? p.username ?? p.author,
          content: p.content ?? p.body ?? "",
          createdAt: p.createdAt ?? p.created_at ?? p.createdDate ?? null,
          likes: p.likes ?? p.likeCount ?? 0,
          comments: p.comments ?? p.commentCount ?? 0,
        }));

        normalized.sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        });

        // 저장 목록 불러오기
        let saved = [];
        try {
          saved = await listSaved({ token });
        } catch (e) {
          console.warn("[FeedPosts] listSaved failed:", e);
        }
        const set = new Set(saved?.map((s) => s.postId));

        if (!cancelled) {
          setPosts(normalized);
          setSavedSet(set);
        }
      } catch (e) {
        console.error("[FeedPosts] load error:", e);
        if (!cancelled) setErr(e.message || "Failed to fetch posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const postsWithSaved = useMemo(
    () => posts.map((p) => ({ ...p, isSaved: savedSet.has(p.postId) })),
    [posts, savedSet]
  );

  const toggleSave = async (postId, next) => {
    // optimistic
    setSavedSet((prev) => {
      const clone = new Set(prev);
      if (next) clone.add(postId);
      else clone.delete(postId);
      return clone;
    });

    try {
      if (next) await savePost(postId, { token });
      else await unsavePost(postId, { token });
    } catch (e) {
      // rollback
      setSavedSet((prev) => {
        const clone = new Set(prev);
        if (next) clone.delete(postId);
        else clone.add(postId);
        return clone;
      });
      alert(`저장 상태 변경에 실패했어요. (${e.message})`);
    }
  };

  if (loading) {
    return (
      <div className="feedposts-container">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="feedpost-container">
            <div className="skeleton-card">
              <div className="skeleton-header">
                <div className="skeleton-avatar shimmer" />
                <div className="skeleton-lines">
                  <div className="skeleton-line shimmer" />
                  <div className="skeleton-line shimmer" />
                </div>
              </div>
              <div className="skeleton-image shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (err) {
    return (
      <div className="feedposts-container">
        <div className="feed-error">피드를 불러오지 못했어요. ({err})</div>
      </div>
    );
  }

  if (!postsWithSaved.length) {
    return (
      <div className="feedposts-container">
        <div className="feed-empty">아직 게시물이 없어요.</div>
      </div>
    );
  }

  return (
    <div className="feedposts-container">
      {postsWithSaved.map((p) => (
        <FeedPost
          key={p.postId}
          img={toImageUrl(p.image || "")}
          username={p.userId || "unknown"}
          avatar={`${API_BASE}/avatars/${p.userId || "default"}.png`}
          content={p.content}
          createdAt={p.createdAt}
          initialLikes={p.likes}
          commentCount={p.comments}
          isSaved={p.isSaved}
          onToggleSave={(next) => toggleSave(p.postId, next)}
        />
      ))}
    </div>
  );
}

export default FeedPosts;
