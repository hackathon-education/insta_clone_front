import React from "react";
import FeedPosts from "../components/FeedPosts/FeedPosts";
import SuggestionPosts from "../components/SuggestionFeed/SuggestionPosts";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-main">
        <div className="homepage-feed">
          <FeedPosts />
        </div>
        <div className="homepage-suggestions">
          <SuggestionPosts />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
