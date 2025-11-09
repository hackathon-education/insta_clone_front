import React from "react";
import SuggestionHeader from "./SuggestionHeader";
import SuggestionPost from "./SuggestionPost";
import "../../styles/SuggestionPosts.css";

function SuggestionPosts() {
  return (
    <div className="suggestion-posts">
      <SuggestionHeader />
      <div className="suggestion-list">
        <SuggestionPost avatar="/img1.png" username="User1" />
        <SuggestionPost avatar="/img2.png" username="User2" />
        <SuggestionPost avatar="/img3.png" username="User3" />
        <SuggestionPost avatar="/img4.png" username="User4" />
      </div>
    </div>
  );
}

export default SuggestionPosts;
