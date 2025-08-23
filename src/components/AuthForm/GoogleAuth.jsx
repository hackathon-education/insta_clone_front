import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import "./AuthForm.css";

function GoogleAuth() {
  return (
    <Flex className="google-auth-container">
      <Image src="/google.png" className="google-auth-icon" />
      <Text className="google-auth-text">Login with Google</Text>
    </Flex>
  );
}

export default GoogleAuth;
