import React from 'react'
import {Box, Container,Flex,Image, VStack} from '@chakra-ui/react';
import AuthForm from '../AuthForm/AuthForm';

function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={450}>
        <Container maxW={"container.md"} padding={0}>
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} gap={10}>

            <Box display={{bse:"none",md:"block"}}>
                <Image src='/auth.png' h={650} alt='image' />
            </Box>

            <VStack spacing={4} align={'stretch'}>
                <AuthForm/>
            </VStack>
        </Flex>
        </Container>
    </Flex>
  )
}

export default AuthPage
