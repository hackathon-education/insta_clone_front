import React from "react";
import "../../styles/AuthForm.css";

function GoogleAuth() {
  return (
    <div className="google-auth-container">
      <img src="/google.png" alt="Google logo" className="google-auth-icon" />
      <span className="google-auth-text">Login with Google</span>
    </div>
  );
}

export default GoogleAuth;
