import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, VStack,Image, Input, Button, Flex, Text, Stack} from '@chakra-ui/react'
import Signup from './Signup'
import Login from './Login'
import GoogleAuth from './GoogleAuth'
function AuthForm() {
  const[isLogin,setIsLogin] =useState(true)
  
  return (
    <Stack direction={'column'} gap={2} alignItems={'center'} justifyContent={'center'} marginTop={"10vh"}>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} width={"50vh"}>
        <VStack spacing={4}>
        <Image src='/logo.png' h={75} cursor={"pointer"}/>
        
      {isLogin ? <Login/>: <Signup/>}
        <Flex alignItems={'center'} justifyContent={'center'} gap={1} w={"full"} my={4}>
          <Box flex={2} h={'1px'} bg={'gray.400'}/>
          <Text mx={1} color={'white'}>OR</Text>
          <Box flex={2} h={'1px'} bg={'gray.400'}/>
        </Flex>
       <GoogleAuth/>
        </VStack>
      </Box>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}  width={"50vh"}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={()=>setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'}>
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </Stack>
  )
}

export default AuthForm
