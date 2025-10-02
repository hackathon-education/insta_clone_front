import React from "react";
import "../styles/Comment.css";

function Comment({ createdAt, username, profilePic, text }) {
  return (
    <div className="comment">
      {/* 아바타 */}
      <img src={profilePic} alt={username} className="comment-avatar" />

      {/* 본문 */}
      <div className="comment-body">
        <div className="comment-top">
          <span className="comment-username">{username}</span>
          <span className="comment-text">{text}</span>
        </div>
        <span className="comment-date">{createdAt}</span>
      </div>
    </div>
  );
}

export default Comment;
