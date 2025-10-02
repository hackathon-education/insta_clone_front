import React from "react";
import FeedPost from "./FeedPost";
import "../../styles/FeedPosts.css";

function FeedPosts() {
  return (
    <div className="feedposts-container">
      <FeedPost img="/img1.png" avatar="/img1.png" username="User1" />
      <FeedPost img="/img2.png" avatar="/img2.png" username="User2" />
      <FeedPost img="/img3.png" avatar="/img3.png" username="User3" />
      <FeedPost img="/img4.png" avatar="/img4.png" username="User4" />
    </div>
  );
}

export default FeedPosts;
