import React from "react";
import SuggestionHeader from "./SuggestionHeader";
import SuggestionPost from "./SuggestionPost";
import "../../styles/SuggestionPosts.css";

function SuggestionPosts() {
  return (
    <div className="suggestion-posts">
      <SuggestionHeader />
      <div className="suggestion-list">
        <SuggestionPost avatar="/avatars/user1.png" username="User1" />
        <SuggestionPost avatar="/avatars/user2.png" username="User2" />
        <SuggestionPost avatar="/avatars/user3.png" username="User3" />
        <SuggestionPost avatar="/avatars/user4.png" username="User4" />
      </div>
    </div>
  );
}

export default SuggestionPosts;
