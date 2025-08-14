import { React, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:1010/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: input.email, // 또는 email 필드로 백엔드 수정
          password: input.password,
        }),
      });

      const result = await response.text();
      if (result !== "fail") {
        console.log("로그인 성공:", result);
        // 성공 처리 로직
      } else {
        console.log("로그인 실패");
        // 실패 처리 로직
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={15}
        type="email"
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />

      <Input
        placeholder="Password"
        fontSize={15}
        type="password"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      />

      <Button
        colorScheme={"blue"}
        width={"150px"}
        variant={"outline"}
        fontSize={15}
        onClick={handleLogin} // 이 부분 추가!
      >
        Log in
      </Button>
    </>
  );
}

export default Login;
