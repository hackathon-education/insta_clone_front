import React from "react";
import "../../styles/ProfileHeader.css";

function ProfileHeader() {
  return (
    <div className="profile-header">
      {/* 아바타 */}
      <div className="profile-avatar-wrap">
        <img src="/profilepic.png" alt="Aditya" className="profile-avatar" />
      </div>

      {/* 우측 정보 */}
      <div className="profile-info">
        {/* 상단 (이름 + 버튼) */}
        <div className="profile-row">
          <span className="profile-username">Aditya</span>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* 통계 */}
        <div className="profile-stats">
          <span><b>4</b> Posts</span>
          <span><b>14977</b> Followers</span>
          <span><b>22</b> Following</span>
        </div>

        {/* 소개 */}
        <div className="profile-bio">
          <span>Just chilling</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
