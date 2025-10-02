import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { CreatePostLogo, InstagramLogo, NotificationsLogo, SearchLogo } from "../assests/logos";
import "../styles/SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasToken, setHasToken] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const sidebarItems = [
    { icon: <AiFillHome size={25} />, text: "Home", link: "/" },
    { icon: <SearchLogo />, text: "Search" },
    { icon: <NotificationsLogo />, text: "Notifications" },
    { icon: <CreatePostLogo />, text: "Create" },
    {
      icon: <img src="/profilepic.png" alt="Aditya" className="sidebar-avatar" />,
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
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link || "#"}
              className="sidebar-item"
              title={item.text}
            >
              {item.icon}
              <span className="sidebar-text">{item.text}</span>
            </Link>
          ))}
        </div>

        {/* 로그인/로그아웃 버튼 */}
        <div
          className="sidebar-item sidebar-auth"
          onClick={hasToken ? handleLogout : handleLogin}
          title={hasToken ? "Log Out" : "Log In"}
        >
          <BiLogOut size={25} />
          <span className="sidebar-text">{hasToken ? "Log Out" : "Log In"}</span>
        </div>
      </div>

      {/* 로그아웃 모달 */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleModalClose}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // 내부 클릭시 닫히지 않도록
          >
            <h2 className="modal-header">로그아웃</h2>
            <p className="modal-body">로그아웃 되었습니다.</p>
            <button className="modal-btn" onClick={handleModalClose}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
