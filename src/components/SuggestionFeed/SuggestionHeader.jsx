import React from "react";
import { Link } from "react-router-dom";
import "../../styles/SuggestionHeader.css";

function SuggestionHeader() {
  return (
    <div className="suggestion-header">
      {/* 아바타 */}
      <img src="/profilepic.png" alt="Aditya" className="suggestion-avatar" />

      {/* 유저명 */}
      <span className="suggestion-username">Aditya</span>

      {/* 로그아웃 링크 */}
      <div className="suggestion-logout">
        <Link to="/login" className="logout-link">
          {/* 필요 시 버튼으로 교체 가능 */}
          Log Out
        </Link>
      </div>
    </div>
  );
}

export default SuggestionHeader;
