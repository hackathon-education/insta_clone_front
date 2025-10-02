import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Signup.css";

const Signup = ({ onSignupSuccess }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // 선택: 성공 안내
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  // 비밀번호 유효성 검사
  useEffect(() => {
    const password = inputs.password || "";
    setPasswordValidation({
      length: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    });
  }, [inputs.password]);

  // 비밀번호 확인
  useEffect(() => {
    if (!inputs.confirmPassword) setPasswordMatch(null);
    else setPasswordMatch(inputs.password === inputs.confirmPassword);
  }, [inputs.password, inputs.confirmPassword]);

  const isPasswordValid = useMemo(
    () => Object.values(passwordValidation).every(Boolean),
    [passwordValidation]
  );

  const isFormValid = useMemo(() => {
    return (
      inputs.name.trim() &&
      inputs.email.trim() &&
      isPasswordValid &&
      passwordMatch
    );
  }, [inputs, isPasswordValid, passwordMatch]);

  const handleSignup = async () => {
    if (!isFormValid) {
      setError("입력값을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:1010/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputs.email.trim(),
          name: inputs.name.trim(),
          password: inputs.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("회원가입 성공:", result);

        const msg = "회원가입이 완료되었습니다. 로그인해주세요.";
        if (onSignupSuccess) {
          onSignupSuccess(msg);
        } else {
          // 라우트가 /login 이 없다면 /auth 로 보내는 게 안전
          navigate("/auth", { state: { message: msg } });
        }
        setSuccess(msg);
      } else {
        setError("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
      }
    } catch (err) {
      console.error("에러:", err);
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="form-container" onKeyDown={onKeyDown}>
      {error && (
        <div className="error-alert" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {success && (
        <div className="success-alert" role="status" aria-live="polite">
          {success}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        disabled={isLoading}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Username"
        autoComplete="username"
        value={inputs.name}
        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        disabled={isLoading}
        className="input-field"
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        disabled={isLoading}
        className={`input-field ${
          inputs.password && !isPasswordValid ? "invalid" : inputs.password && isPasswordValid ? "valid" : ""
        }`}
      />

      {inputs.password && (
        <div className="password-rules">
          <p className={passwordValidation.length ? "valid" : "invalid"}>
            {passwordValidation.length ? "✓" : "✗"} 8자 이상
          </p>
          <p className={passwordValidation.hasLetter ? "valid" : "invalid"}>
            {passwordValidation.hasLetter ? "✓" : "✗"} 영문자 포함
          </p>
          <p className={passwordValidation.hasNumber ? "valid" : "invalid"}>
            {passwordValidation.hasNumber ? "✓" : "✗"} 숫자 포함
          </p>
          <p className={passwordValidation.hasSpecial ? "valid" : "invalid"}>
            {passwordValidation.hasSpecial ? "✓" : "✗"} 특수문자 포함
          </p>
        </div>
      )}


      <input
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        value={inputs.confirmPassword}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
        disabled={isLoading}
        className={`input-field ${
          inputs.confirmPassword
            ? passwordMatch
              ? "valid"
              : "invalid"
            : ""
        }`}
      />

      {inputs.confirmPassword && (
        <p className={`status-text ${passwordMatch ? "valid" : "invalid"}`}>
          {passwordMatch ? "✓ 비밀번호가 일치합니다" : "✗ 비밀번호가 일치하지 않습니다"}
        </p>
      )}

      <button
        onClick={handleSignup}
        disabled={isLoading || !isFormValid}
        className="form-button"
      >
        {isLoading ? "가입 중..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;
