import React, { useEffect, useState } from "react";
import FeedHeader from "./FeedHeader";
import FeedFooter from "./FeedFooter";
import "../../styles/FeedPost.css";

function FeedPost({ img, username, avatar }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="feedpost-container">
      {isLoading ? (
        <div className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar shimmer" />
            <div className="skeleton-lines">
              <div className="skeleton-line shimmer" />
              <div className="skeleton-line shimmer" />
            </div>
          </div>
          <div className="skeleton-image shimmer" />
        </div>
      ) : (
        <>
          <FeedHeader username={username} avatar={avatar} />
          <div className="feedpost-image-wrap">
            <img src={img} alt={`${username}'s post`} className="feedpost-image" />
          </div>
          <FeedFooter />
        </>
      )}
    </div>
  );
}

export default FeedPost;
