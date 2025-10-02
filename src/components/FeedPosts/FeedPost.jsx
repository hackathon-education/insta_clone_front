// src/components/FeedPosts/FeedPost.jsx
import React from "react";
import FeedHeader from "./FeedHeader";
import FeedFooter from "./FeedFooter";
import "../../styles/FeedPost.css";

function timeAgo(iso) {
  if (!iso) return "";
  const diff = (Date.now() - new Date(iso).getTime()) / 1000; // sec
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

function FeedPost({ img, username, avatar, content, createdAt, initialLikes, commentCount }) {
  return (
    <div className="feedpost-container">
      <FeedHeader
        username={username}
        avatar={avatar}
        subtitle={timeAgo(createdAt)}
      />
      <div className="feedpost-image-wrap">
        <img
          src={img}
          alt={`${username}'s post`}
          className="feedpost-image"
          onError={(e) => (e.currentTarget.src = "/fallbacks/post_fallback.png")}
        />
      </div>

      {/* 캡션(본문) */}
      {content && (
        <div className="feedpost-caption">
          <span className="feed-username-inline">{username}</span>&nbsp;
          <span className="feed-caption-text">{content}</span>
        </div>
      )}

      <FeedFooter initialLikes={initialLikes} commentCount={commentCount} />
    </div>
  );
}

export default FeedPost;
