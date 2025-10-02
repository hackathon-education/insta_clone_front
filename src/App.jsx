import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./Layouts/PageLayout";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import HomePage from "./HomePage/HomePage";
import AuthPage from "./components/AuthPage/AuthPage";

export default function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<ProfilePage />} />

        {/* 잘못된 경로는 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageLayout>
  );
}
