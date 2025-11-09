// src/components/Profile/ProfileTab.jsx
import React from "react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";
import "../../styles/ProfileTab.css";

function ProfileTab({ current = "posts", onChange }) {
  const Tab = ({ id, icon, text }) => (
    <button
      className={`tab-item ${current === id ? "active" : ""}`}
      onClick={() => onChange?.(id)}
    >
      <span className="tab-icon">{icon}</span>
      <span className="tab-text">{text}</span>
    </button>
  );

  return (
    <div className="profile-tab">
      <Tab id="posts" icon={<BsGrid3X3 />} text="Posts" />
      <Tab id="saved" icon={<BsBookmark />} text="Saved" />
      <Tab id="likes" icon={<BsSuitHeart />} text="Likes" />
    </div>
  );
}

export default ProfileTab;
