import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SuggestionPost.css";

export default function SuggestionPost({ avatar, username }) {
  return (
    <div className="suggestion-post">
      {/* 아바타 */}
      <img src={avatar} alt={username} className="suggestion-avatar" />

      {/* 유저 이름 */}
      <span className="suggestion-username">{username}</span>

      {/* 팔로우 버튼 */}
      <div className="suggestion-follow">
        <Link to="/" className="follow-link">
          Follow
        </Link>
      </div>
    </div>
  );
}
