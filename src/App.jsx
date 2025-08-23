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
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}
