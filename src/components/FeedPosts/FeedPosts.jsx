import React, { useEffect, useState, useMemo } from "react";
import FeedPost from "./FeedPost";
import "../../styles/FeedPosts.css";
import { API_BASE } from "../../api/http";
import { listSaved, savePost, unsavePost } from "../../api/saved";

const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

function FeedPosts() {
  const [posts, setPosts] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set()); // postId 집합
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        // 1) 포스트 전체
        const res = await fetch(`${API_BASE}/api/v1/posts`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // 2) 저장 목록
        const saved = await listSaved();
        const set = new Set(saved?.map((s) => s.postId));

        if (!cancelled) {
          setPosts(sorted);
          setSavedSet(set);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to fetch posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const postsWithSaved = useMemo(
    () => posts.map((p) => ({ ...p, isSaved: savedSet.has(p.postId) })),
    [posts, savedSet]
  );

  // 하트 클릭 핸들러 (저장/해제 토글)
  const toggleSave = async (postId, next) => {
    // next: true(저장), false(해제)
    // 낙관적 적용
    setSavedSet((prev) => {
      const clone = new Set(prev);
      if (next) clone.add(postId);
      else clone.delete(postId);
      return clone;
    });

    try {
      if (next) await savePost(postId);
      else await unsavePost(postId);
    } catch (e) {
      // 실패 시 롤백
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
          img={toImageUrl(p.image)}
          username={p.userId}
          avatar={`/avatars/${p.userId}.png`}
          content={p.content}
          createdAt={p.createdAt}
          initialLikes={p.likes}
          commentCount={p.comments}
          isSaved={p.isSaved}                       // ★ 추가
          onToggleSave={(next) => toggleSave(p.postId, next)} // ★ 추가
        />
      ))}
    </div>
  );
}

export default FeedPosts;
