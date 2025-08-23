import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const Signup = ({ onSignupSuccess }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
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
    const password = inputs.password;
    setPasswordValidation({
      length: password.length >= 8,
      hasLetter: /[a-zA-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    });
  }, [inputs.password]);

  // 비밀번호 확인 일치 여부 검사
  useEffect(() => {
    if (inputs.confirmPassword === "") {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(inputs.password === inputs.confirmPassword);
    }
  }, [inputs.password, inputs.confirmPassword]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSignup = async () => {
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.confirmPassword
    ) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (!isPasswordValid) {
      setError("비밀번호 요구사항을 모두 만족해야 합니다.");
      return;
    }

    if (!passwordMatch) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:1010/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          name: inputs.name,
          password: inputs.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("회원가입 성공:", result);

        // onSignupSuccess prop이 있으면 호출 (AuthForm에서 사용)
        if (onSignupSuccess) {
          onSignupSuccess("회원가입이 완료되었습니다. 로그인해주세요.");
        } else {
          // 별도 페이지인 경우
          navigate("/login", {
            state: { message: "회원가입이 완료되었습니다. 로그인해주세요." },
          });
        }
      } else {
        const errorData = await response.text();
        console.log("회원가입 실패:", errorData);
        setError("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
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
      handleSignup();
    }
  };

  return (
    <div className="form-container">
      {error && (
        <Alert status="error" className="error-alert">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <div className="input-container">
        <Input
          placeholder="Email"
          fontSize={14}
          type="email"
          size={"sm"}
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          onKeyPress={handleKeyPress}
          isDisabled={isLoading}
        />
      </div>

      <div className="input-container">
        <Input
          placeholder="Username"
          fontSize={14}
          type="text"
          size={"sm"}
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          onKeyPress={handleKeyPress}
          isDisabled={isLoading}
        />
      </div>

      <div className="input-container">
        <InputGroup>
          <Input
            placeholder="Password"
            fontSize={14}
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            size={"sm"}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            onKeyPress={handleKeyPress}
            isDisabled={isLoading}
            borderColor={inputs.password && !isPasswordValid ? "red.300" : ""}
          />
          <InputRightElement h="full">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setShowPassword(!showPassword)}
              isDisabled={isLoading}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* 비밀번호 요구사항 표시 */}
        {inputs.password && (
          <Box mt={2} p={2} bg="gray.50" borderRadius="md" fontSize="xs">
            <Text color={passwordValidation.length ? "green.500" : "red.500"}>
              ✓ 8자 이상 {passwordValidation.length ? "✓" : "✗"}
            </Text>
            <Text
              color={passwordValidation.hasLetter ? "green.500" : "red.500"}
            >
              ✓ 영문자 포함 {passwordValidation.hasLetter ? "✓" : "✗"}
            </Text>
            <Text
              color={passwordValidation.hasNumber ? "green.500" : "red.500"}
            >
              ✓ 숫자 포함 {passwordValidation.hasNumber ? "✓" : "✗"}
            </Text>
            <Text
              color={passwordValidation.hasSpecial ? "green.500" : "red.500"}
            >
              ✓ 특수문자 포함 {passwordValidation.hasSpecial ? "✓" : "✗"}
            </Text>
          </Box>
        )}
      </div>

      <div className="input-container">
        <InputGroup>
          <Input
            placeholder="Confirm Password"
            fontSize={14}
            type={showConfirmPassword ? "text" : "password"}
            value={inputs.confirmPassword}
            size={"sm"}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
            onKeyPress={handleKeyPress}
            isDisabled={isLoading}
            borderColor={
              inputs.confirmPassword && passwordMatch === false
                ? "red.300"
                : inputs.confirmPassword && passwordMatch === true
                ? "green.300"
                : ""
            }
          />
          <InputRightElement h="full">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              isDisabled={isLoading}
            >
              {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* 비밀번호 일치 여부 표시 */}
        {inputs.confirmPassword && (
          <Text
            fontSize="xs"
            mt={1}
            color={passwordMatch ? "green.500" : "red.500"}
          >
            {passwordMatch
              ? "✓ 비밀번호가 일치합니다"
              : "✗ 비밀번호가 일치하지 않습니다"}
          </Text>
        )}
      </div>

      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={14}
        onClick={handleSignup}
        isLoading={isLoading}
        loadingText="가입 중..."
        className="form-button"
        isDisabled={
          !isPasswordValid || !passwordMatch || !inputs.name || !inputs.email
        }
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Signup;
