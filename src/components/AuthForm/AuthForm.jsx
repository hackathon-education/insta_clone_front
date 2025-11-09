import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";
import "../../styles/AuthForm.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // 회원가입 성공 메시지 확인
  useEffect(() => {
    const signupSuccess = localStorage.getItem("signupSuccess");
    if (signupSuccess) {
      setSuccessMessage(signupSuccess);
      setIsLogin(true);
      localStorage.removeItem("signupSuccess");

      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSignupSuccess = (message) => {
    setSuccessMessage(message);
    setIsLogin(true);
    const timer = setTimeout(() => setSuccessMessage(""), 5000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="auth-form-stack">
      <div className="auth-main-box">
        <div className="auth-vstack">
          <img src="/logo.png" alt="logo" className="auth-logo" />

          {successMessage && (
            <div className="auth-alert success" role="alert">
              <span className="auth-alert-icon">✓</span>
              <span>{successMessage}</span>
            </div>
          )}

          {isLogin ? (
            <Login />
          ) : (
            <Signup onSignupSuccess={handleSignupSuccess} />
          )}

          <div className="auth-divider-container">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">OR</span>
            <div className="auth-divider-line" />
          </div>

          <GoogleAuth />
        </div>
      </div>

      <div className="auth-bottom-box">
        <div className="auth-bottom-flex">
          <div className="auth-bottom-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </div>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="auth-bottom-link"
          >
            {isLogin ? "Sign Up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
