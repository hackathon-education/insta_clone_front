// src/components/pages/ProfilePage.jsx (경로는 프로젝트 구조에 맞춰주세요)
import React, { useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileTab from "../Profile/ProfileTab";
import ProfilePosts from "../Profile/ProfilePosts";
import SavedMinimal from "../Profile/SavedMinimal"; // 저장 목록 최소 표시용
import "../../styles/ProfilePage.css";

function ProfilePage() {
  const [tab, setTab] = useState("posts");

  return (
    <div className="profile-page">
      {/* 상단 프로필 헤더 */}
      <div className="profile-header-section">
        <ProfileHeader />
      </div>

      {/* 탭 + 탭 콘텐츠 */}
      <div className="profile-content-section">
        <ProfileTab current={tab} onChange={setTab} />

        <div className="profile-tab-panel" style={{ marginTop: 16 }}>
          {tab === "posts" && <ProfilePosts />}
          {tab === "saved" && <SavedMinimal />}
          {tab === "likes" && <div>Likes 탭 콘텐츠</div>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
