import React from "react";
import ProfilePost from "./ProfilePost";
import "../../styles/ProfilePosts.css";

function ProfilePosts() {
  return (
    <div className="profile-posts-grid">
      <ProfilePost img="/img1.png" />
      <ProfilePost img="/img2.png" />
      <ProfilePost img="/img3.png" />
      <ProfilePost img="/auth.png" />
    </div>
  );
}

export default ProfilePosts;
