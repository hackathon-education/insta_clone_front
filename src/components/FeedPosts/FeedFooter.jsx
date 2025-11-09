// src/components/FeedPosts/FeedFooter.jsx
import React, { useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assests/logos";
import "../../styles/FeedFooter.css";

function FeedFooter({ initialLikes = 0, commentCount = 0 }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    // 낙관적 업데이트 (원하면 여기서 /api/v1/posts/:id/like POST 붙이면 됨)
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="feed-footer">
      {/* 아이콘 영역 */}
      <div className="feed-footer-icons">
        <button className="icon-button" onClick={handleLike} aria-label="like">
          {liked ? <UnlikeLogo /> : <NotificationsLogo />}
        </button>
        <button className="icon-button" aria-label="comment">
          <CommentLogo />
        </button>
      </div>

      {/* 좋아요/댓글 카운트 */}
      <p className="likes-text">{likes} likes · {commentCount} comments</p>

      {/* 댓글 입력 영역 */}
      <div className="comment-box">
        <input
          type="text"
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button className="comment-post-btn">Post</button>
      </div>
    </div>
  );
}

export default FeedFooter;
