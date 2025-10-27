// src/components/SavedFeed/SavedPosts.jsx
import React, { useEffect, useState, useMemo } from "react";
import FeedPost from "../FeedPosts/FeedPost";
import { API_BASE } from "../../api/http";
import { listSaved, unsavePost } from "../../api/saved";

const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

// 단건 게시물 조회 헬퍼
async function fetchPostById(id, { token } = {}) {
  const res = await fetch(`${API_BASE}/api/v1/posts/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
    credentials: token ? "omit" : "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`fetchPostById(${id}) failed: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

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

function SavedPosts({ token } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        // 1) 저장 목록(postId들) 조회
        const saved = await listSaved({ token }); // [{postId, createdAt}]
        const ids = (saved || []).map((s) => s.postId).filter(Boolean);

        // 2) 병렬로 게시물 상세 조회
        const results = await Promise.allSettled(
          ids.map((id) => fetchPostById(id, { token }))
        );

        const normalized = results
          .filter((r) => r.status === "fulfilled" && r.value)
          .map((r) => normalizePost(r.value));

        if (!cancelled) setPosts(normalized);
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

  const postsSorted = useMemo(() => {
    return [...posts].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });
  }, [posts]);

  const handleUnsave = async (postId) => {
    const prev = posts;
    setPosts((p) => p.filter((x) => x.postId !== postId)); // optimistic
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
          // FeedPost가 (next:boolean) 을 넘겨주므로, 저장 해제(next=false)일 때만 호출
          onToggleSave={(next) => { if (!next) handleUnsave(p.postId); }}
        />
      ))}
    </div>
  );
}

export default SavedPosts;
