import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill, BsBookmark } from "react-icons/bs";
import "../../styles/FeedPost.css";

export default function FeedPost({
  img,
  username,
  avatar,
  content,
  createdAt,
  initialLikes,
  commentCount,
  isSaved = false,
  onToggleSave, // (nextBool) => void
}) {
  const [saved, setSaved] = useState(isSaved);
  const [busy, setBusy] = useState(false);

  const handleClickSave = async () => {
    if (!onToggleSave || busy) return;
    const next = !saved;
    setSaved(next);       // UI 즉시 반영
    setBusy(true);
    try {
      await onToggleSave(next);
    } catch {
      setSaved(!next);    // 실패 시 되돌림 (여기선 부모에서 이미 처리해서 보통 안옴)
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="feedpost-container">
      <div className="feedpost-header">
        <img className="feedpost-avatar" src={avatar} alt={username} />
        <div className="feedpost-user">
          <div className="user-name">{username}</div>
          <div className="post-date">
            {new Date(createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="feedpost-image-wrap">
        <img className="feedpost-image" src={img} alt={content?.slice(0, 20)} />
      </div>

      <div className="feedpost-actions">
        <button
          className={`heart-btn ${saved ? "on" : ""}`}
          onClick={handleClickSave}
          disabled={busy}
          title={saved ? "저장 해제" : "저장"}
        >
          {saved ? <BsSuitHeartFill /> : <BsSuitHeart />}
        </button>

        {/* (옵션) 저장됨 표시 */}
        {saved && <span className="saved-chip"><BsBookmark /> Saved</span>}
      </div>

      <div className="feedpost-content">
        <p>{content}</p>
        <div className="meta">
          <span>좋아요 {initialLikes ?? 0}</span>
          <span>댓글 {commentCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
