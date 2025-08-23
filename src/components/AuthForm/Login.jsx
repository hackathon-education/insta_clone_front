import { React, useState, useEffect } from "react";
import { Button, Input, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthForm.css";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 회원가입에서 온 성공 메시지 처리
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // state 초기화 (뒤로가기 시 메시지가 다시 나오지 않도록)
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!input.email || !input.password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:1010/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("로그인 성공:", result);

        // 토큰을 localStorage에 저장
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // 메인 페이지로 리다이렉션
        navigate("/");
      } else {
        const errorData = await response.text();
        console.log("로그인 실패:", errorData);
        setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("에러:", error);
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="form-container">
      {successMessage && (
        <Alert status="success" className="success-alert">
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert status="error" className="error-alert">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <div className="input-container">
        <Input
          placeholder="Email"
          fontSize={15}
          type="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          onKeyPress={handleKeyPress}
          isDisabled={isLoading}
        />
      </div>

      <div className="input-container">
        <Input
          placeholder="Password"
          fontSize={15}
          type="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          onKeyPress={handleKeyPress}
          isDisabled={isLoading}
        />
      </div>

      <Button
        colorScheme={"blue"}
        width={"150px"}
        variant={"outline"}
        fontSize={15}
        onClick={handleLogin}
        isLoading={isLoading}
        loadingText="로그인 중..."
        className="form-button"
        alignSelf="center"
      >
        Log in
      </Button>
    </div>
  );
}

export default Login;
