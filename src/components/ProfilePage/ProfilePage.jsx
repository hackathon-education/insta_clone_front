import React from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileTab from "../Profile/ProfileTab";
import ProfilePosts from "../Profile/ProfilePosts";
import "../../styles/ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-page">
      {/* 상단 프로필 헤더 */}
      <div className="profile-header-section">
        <ProfileHeader />
      </div>

      {/* 탭 + 게시물 */}
      <div className="profile-content-section">
        <ProfileTab />
        <ProfilePosts />
      </div>
    </div>
  );
}

export default ProfilePage;
