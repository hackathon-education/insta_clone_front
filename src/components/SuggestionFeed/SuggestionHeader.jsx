import { Flex,Avatar,Text, Box, Link,Button} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router-dom'
import React from 'react'


function SuggestionHeader() {
  return (
    <>
        <Flex justifyContent={'center'} alignItems={'center'} mt={5}>
            <Avatar src='/profilepic.png' size={'sm'}/>
            
            <Flex fontSize={15} fontWeight={"bold"} gap={2} p={5}>
               Aditya
            </Flex> 
            <Flex ml={'50px'}>
            <Link to = {'/login'} as={RouterLink} display={'block'} cursor={'pointer'}>
                <Button colorScheme='teal' variant='ghost' size={'sm'} >
                    Log Out
                </Button>
            </Link>
            </Flex>
        </Flex>
    </>
  )
}

export default SuggestionHeader
