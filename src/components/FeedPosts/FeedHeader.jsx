// src/components/FeedPosts/FeedHeader.jsx
import React from "react";
import "../../styles/FeedHeader.css";

function FeedHeader({ username, avatar, subtitle }) {
  return (
    <div className="feed-header">
      <div className="feed-header-left">
        <img
          src={avatar}
          alt={username}
          className="feed-avatar"
          onError={(e) => (e.currentTarget.src = "/fallbacks/avatar_default.png")}
        />
        <div className="feed-name-wrap">
          <span className="feed-username">{username}</span>
          {subtitle && <span className="feed-subtitle">{subtitle}</span>}
        </div>
      </div>

      <button className="unfollow-btn">Unfollow</button>
    </div>
  );
}

export default FeedHeader;
