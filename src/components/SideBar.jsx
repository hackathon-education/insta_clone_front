import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import {
  CreatePostLogo,
  InstagramLogo,
  NotificationsLogo,
  SearchLogo,
} from "../assests/logos";
import "../styles/SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasToken, setHasToken] = useState(false);

  // 로그아웃 모달
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 잠김 항목 모달
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLockedClick = (e) => {
    e.preventDefault();
    setIsLockedModalOpen(true);
  };

  const handleLockedModalClose = () => {
    setIsLockedModalOpen(false);
  };

  const sidebarItems = [
    { icon: <AiFillHome size={25} />, text: "Home", link: "/" },
    { icon: <SearchLogo />, text: "Search", locked: true },
    { icon: <NotificationsLogo />, text: "Notifications", locked: true },
    { icon: <CreatePostLogo />, text: "Create", locked: true },
    {
      icon: (
        <img
          src="/profilepic.png"
          alt="profile"
          className="sidebar-avatar"
        />
      ),
      text: "Profile",
      link: "/Aditya",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        {/* 로고 */}
        <Link to="/" className="sidebar-logo">
          <InstagramLogo />
        </Link>

        {/* 메뉴 */}
        <div className="sidebar-menu">
          {sidebarItems.map((item, index) => {
            if (item.locked) {
              return (
                <div
                  key={index}
                  className="sidebar-item"
                  onClick={handleLockedClick}
                  title={item.text}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setIsLockedModalOpen(true);
                    }
                  }}
                >
                  {item.icon}
                  <span className="sidebar-text">{item.text}</span>
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.link || "#"}
                className="sidebar-item"
                title={item.text}
              >
                {item.icon}
                <span className="sidebar-text">{item.text}</span>
              </Link>
            );
          })}
        </div>

        {/* 로그인/로그아웃 버튼 */}
        <div
          className="sidebar-item sidebar-auth"
          onClick={hasToken ? handleLogout : handleLogin}
          title={hasToken ? "Log Out" : "Log In"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              hasToken ? handleLogout() : handleLogin();
            }
          }}
        >
          <BiLogOut size={25} />
          <span className="sidebar-text">{hasToken ? "Log Out" : "Log In"}</span>
        </div>
      </div>

      {/* 로그아웃 모달 */}
      {isLogoutModalOpen && (
        <div className="modal-backdrop" onClick={handleLogoutModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">로그아웃</h2>
            <p className="modal-body">로그아웃 되었습니다.</p>
            <button className="modal-btn" onClick={handleLogoutModalClose}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 잠김 항목 모달 */}
      {isLockedModalOpen && (
        <div className="modal-backdrop" onClick={handleLockedModalClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">잠김 항목</h2>
            <p className="modal-body">해당 기능은 현재 잠겨 있습니다.</p>
            <button className="modal-btn" onClick={handleLockedModalClose}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
