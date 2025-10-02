import React, { useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assests/logos";
import "../../styles/FeedFooter.css";

function FeedFooter() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <div className="feed-footer">
      {/* 아이콘 영역 */}
      <div className="feed-footer-icons">
        <div className="icon-button" onClick={handleLike}>
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </div>
        <div className="icon-button">
          <CommentLogo />
        </div>
      </div>

      {/* 좋아요 카운트 */}
      <p className="likes-text">{likes} likes</p>

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
