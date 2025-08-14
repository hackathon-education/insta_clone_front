import { Avatar, Flex,VStack,Text,Box,Link} from '@chakra-ui/react'
import React from 'react'
import {Link as RouterLink} from 'react-router-dom'

export default function SuggestionPost({avatar,username}) {
  return (
    
      <Flex  alignItems={'center'} gap={5} mb={4}>
        <Avatar src={avatar} size={'sm'}/>
        <Text>
            {username}
        </Text>
        
        <Box ml={'auto'}>
          <Text fontSize={15} fontWeight={'bold'} color={'teal'}>
            <Link to={'/'} as={RouterLink}>
              Follow
            </Link>
          </Text>
        </Box>
      </Flex>
   
  )
}
