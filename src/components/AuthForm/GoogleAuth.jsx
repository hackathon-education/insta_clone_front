import React from 'react'
import { Flex,Image,Text } from '@chakra-ui/react'

function GoogleAuth() {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
    <Image src='/google.png' w={5}/>
    <Text mx={4} color={'blue'}>
      Login with Google
    </Text>
  </Flex>
  )
}

export default GoogleAuth
