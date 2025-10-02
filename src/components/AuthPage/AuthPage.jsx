import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import "../../styles/AuthForm.css";

function AuthPage() {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-flex-container">
          <div className="auth-image-container">
            <img src="/auth.png" className="auth-image" alt="auth visual" />
          </div>

          <div className="auth-form-stack">
            <div className="auth-main-box">
              <div className="auth-vstack">
                <AuthForm />
              </div>
            </div>

            {/* 필요 시 하단 안내 박스 사용 */}
            {/* <div className="auth-bottom-box">...</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
