import React from "react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";
import "../../styles/ProfileTab.css";

function ProfileTab() {
  return (
    <div className="profile-tab">
      <div className="tab-item">
        <span className="tab-icon">
          <BsGrid3X3 />
        </span>
        <span className="tab-text">Posts</span>
      </div>

      <div className="tab-item">
        <span className="tab-icon">
          <BsBookmark />
        </span>
        <span className="tab-text">Saved</span>
      </div>

      <div className="tab-item">
        <span className="tab-icon">
          <BsSuitHeart />
        </span>
        <span className="tab-text">Likes</span>
      </div>
    </div>
  );
}

export default ProfileTab;
