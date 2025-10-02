import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment";
import FeedFooter from "../FeedPosts/FeedFooter";
import "../../styles/ProfilePost.css";

function ProfilePost({ img }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // 배경 스크롤 잠금 + ESC로 닫기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e) => {
        if (e.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* 포스트 썸네일 */}
      <div className="profile-post" onClick={openModal}>
        <img src={img} alt="Post" className="profile-post-img" />
        <div className="profile-post-overlay">
          <div className="overlay-icons">
            <div className="overlay-item">
              <AiFillHeart size={20} />
              <span>7</span>
            </div>
            <div className="overlay-item">
              <FaComment size={20} />
              <span>7</span>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              ✕
            </button>

            <div className="modal-body">
              {/* 좌측 이미지 */}
              <div className="modal-img-wrap">
                <img src={img} alt="Post detail" />
              </div>

              {/* 우측 댓글/정보 */}
              <div className="modal-info">
                <div className="modal-header">
                  <div className="modal-user">
                    <img
                      src="/profilepic.png"
                      alt="Aditya"
                      className="modal-avatar"
                    />
                    <span className="modal-username">Aditya</span>
                  </div>
                  <button className="delete-btn" aria-label="Delete post">
                    <MdDelete size={20} />
                  </button>
                </div>

                <hr className="divider" />

                <div className="modal-comments">
                  <Comment
                    createdAt="1d ago"
                    username="user1"
                    profilePic="/profilepic.png"
                    text="Dummy images"
                  />
                  <Comment
                    createdAt="16d ago"
                    username="user31"
                    profilePic="/profilepic.png"
                    text="Dummy images"
                  />
                  <Comment
                    createdAt="12d ago"
                    username="user31"
                    profilePic="/img2.png"
                    text="Dummy images"
                  />
                  <Comment
                    createdAt="11d ago"
                    username="user12"
                    profilePic="/img1.png"
                    text="Dummy images"
                  />
                </div>

                <hr className="divider" />

                <FeedFooter />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePost;
