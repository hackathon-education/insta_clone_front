import React from "react";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../AuthForm/AuthForm";
import "../AuthForm/AuthForm.css";

function AuthPage() {
  return (
    <Flex className="auth-container">
      <Container className="auth-content">
        <Flex className="auth-flex-container">
          <Box className="auth-image-container">
            <Image src="/auth.png" className="auth-image" alt="image" />
          </Box>

          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
