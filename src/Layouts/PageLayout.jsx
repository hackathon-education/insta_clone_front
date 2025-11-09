import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/PageLayout.css";
import SideBar from "../components/SideBar";

function PageLayout({ children }) {
  const { pathname } = useLocation();
  const canRenderSidebar = pathname !== "/AuthPage";

  return (
    <div className="page-layout">
      {canRenderSidebar && (
        <div className="sidebar-container">
          <SideBar />
        </div>
      )}
      <div className="content-container">{children}</div>
    </div>
  );
}

export default PageLayout;
