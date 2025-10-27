import React, { useEffect, useState } from "react";
import { listSaved, savePost, unsavePost } from "../../api/saved";
import { API_BASE } from "../../api/http";
import "./SavedPosts.css";

const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

export default function SavedPosts() {
  const [grid, setGrid] = useState([]); // [{postId, image, userId, createdAt, isSaved:true}]
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        // 1) 저장 목록
        const saved = await listSaved(); // [{postId, ...}]
        const savedIds = new Set(saved.map((s) => s.postId));

        // 2) 전체 포스트 → savedIds만 필터
        const res = await fetch(`${API_BASE}/api/v1/posts`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const allPosts = await res.json();

        const onlySaved = allPosts
          .filter((p) => savedIds.has(p.postId))
          .map((p) => ({
            postId: p.postId,
            image: toImageUrl(p.image),
            userId: p.userId,
            createdAt: p.createdAt,
            isSaved: true,
          }));

        if (!cancelled) setGrid(onlySaved);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load saved posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => (cancelled = true);
  }, []);

  const toggleOne = async (postId) => {
    // saved 탭에서도 하트 누르면 해제
    setGrid((prev) => prev.map((g) => (g.postId === postId ? { ...g, isSaved: !g.isSaved } : g)));
    try {
      await unsavePost(postId);
      // 해제된 건 그리드에서 제거해 UX 선명하게
      setGrid((prev) => prev.filter((g) => !(g.postId === postId && !g.isSaved)));
    } catch (e) {
      // 롤백
      setGrid((prev) => prev.map((g) => (g.postId === postId ? { ...g, isSaved: true } : g)));
      alert(`저장 해제 실패: ${e.message}`);
    }
  };

  if (loading) return <div className="saved-grid loading">불러오는 중…</div>;
  if (err) return <div className="saved-grid error">목록을 불러오지 못했어요. ({err})</div>;
  if (!grid.length) return <div className="saved-grid empty">저장된 게시물이 없어요.</div>;

  return (
    <div className="saved-grid">
      {grid.map((p) => (
        <div key={p.postId} className="saved-card">
          <img className="saved-img" src={p.image} alt={p.postId} />
          <button className="saved-heart" onClick={() => toggleOne(p.postId)} title="저장 해제">
            ♥
          </button>
        </div>
      ))}
    </div>
  );
}
