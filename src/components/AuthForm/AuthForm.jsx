import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Image,
  Flex,
  Text,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";
import "./AuthForm.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  // 회원가입 성공 메시지 확인
  useEffect(() => {
    const signupSuccess = localStorage.getItem("signupSuccess");
    if (signupSuccess) {
      setSuccessMessage(signupSuccess);
      setIsLogin(true); // 로그인 폼으로 전환
      localStorage.removeItem("signupSuccess"); // 메시지 제거

      // 3초 후 메시지 제거
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  }, []);

  // 회원가입 성공 시 호출될 함수
  const handleSignupSuccess = (message) => {
    setSuccessMessage(message);
    setIsLogin(true); // 로그인 폼으로 전환

    // 5초 후 메시지 제거
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  // Signup 컴포넌트에 전달할 props
  const signupProps = {
    onSignupSuccess: handleSignupSuccess,
  };

  return (
    <Stack className="auth-form-stack">
      <Box className="auth-main-box">
        <VStack className="auth-vstack">
          <Image src="/logo.png" className="auth-logo" />

          {successMessage && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              {successMessage}
            </Alert>
          )}

          {isLogin ? (
            <Login />
          ) : (
            <Signup onSignupSuccess={handleSignupSuccess} />
          )}

          <Flex className="auth-divider-container">
            <Box className="auth-divider-line" />
            <Text className="auth-divider-text">OR</Text>
            <Box className="auth-divider-line" />
          </Flex>

          <GoogleAuth />
        </VStack>
      </Box>

      <Box className="auth-bottom-box">
        <Flex className="auth-bottom-flex">
          <Box className="auth-bottom-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            className="auth-bottom-link"
          >
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
}

export default AuthForm;
