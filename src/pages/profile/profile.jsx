import React, { useState } from "react";
import ProfileTab from "../../components/Profile/ProfileTab";
import SavedPosts from "./SavedPosts";
// import MyPosts from "./MyPosts"; // 네 프로젝트의 기존 파일
// import LikedPosts from "./LikedPosts"; // 필요시

export default function Profile() {
  const [tab, setTab] = useState("posts");

  return (
    <div>
      <ProfileTab current={tab} onChange={setTab} />
      {tab === "posts" && <div>{/* <MyPosts /> */}내 게시물</div>}
      {tab === "saved" && <SavedPosts />}
      {tab === "likes" && <div>{/* <LikedPosts /> */}좋아요</div>}
    </div>
  );
}
