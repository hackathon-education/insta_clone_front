import React from "react";
import "../../styles/FeedHeader.css";

function FeedHeader({ username, avatar }) {
  return (
    <div className="feed-header">
      <div className="feed-header-left">
        <img src={avatar} alt={username} className="feed-avatar" />
        <span className="feed-username">{username}</span>
      </div>

      <button className="unfollow-btn">Unfollow</button>
    </div>
  );
}

export default FeedHeader;
