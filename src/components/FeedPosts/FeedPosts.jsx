// src/components/FeedPosts/FeedPosts.jsx
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import "../../styles/FeedPosts.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:1010";

// 상대 경로(/images/...)면 백엔드 호스트를 붙여 절대 URL로 변환
const toImageUrl = (path) => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

function FeedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`${API_BASE}/api/v1/posts`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          // createdAt 최신순 정렬(옵션)
          const sorted = [...data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sorted);
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

  // 로딩 스켈레톤
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

  // 에러
  if (err) {
    return (
      <div className="feedposts-container">
        <div className="feed-error">피드를 불러오지 못했어요. ({err})</div>
      </div>
    );
  }

  // 빈 상태
  if (!posts.length) {
    return (
      <div className="feedposts-container">
        <div className="feed-empty">아직 게시물이 없어요.</div>
      </div>
    );
  }

  // 정상 렌더
  return (
    <div className="feedposts-container">
      {posts.map((p) => (
        <FeedPost
          key={p.postId}
          img={toImageUrl(p.image)}                 // ← 백엔드에서 서빙되는 이미지
          username={p.userId}                       // 임시로 userId 노출
          avatar={`/avatars/${p.userId}.png`}  // 폴백 아바타(프론트 public)
          content={p.content}
          createdAt={p.createdAt}
          initialLikes={p.likes}
          commentCount={p.comments}
        />
      ))}
    </div>
  );
}

export default FeedPosts;
