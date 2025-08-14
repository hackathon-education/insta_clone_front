import { Box, Button, Flex,Input,InputGroup,InputRightElement,Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CommentLogo, NotificationsLogo,UnlikeLogo } from '../../assests/logos';

function FeedFooter() {
  const[liked,setLiked] = useState(false);
  const[likes,setLikes] =useState(0);
  
  const handleLike =()=>
  {
    if(liked)
    {
      setLiked(flase);
      setLikes(likes-1);
    }
    else
    {
      setLiked(true);
      setLikes(likes+1);
    }
  }
  return (
    <Box mb={10} mt={'auto'}>
    <Flex justifyItems={'center'} gap={4} mt={3}>
      <Box onClick={handleLike} cursor={'pointer'} fontSize={8}>
        {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
      </Box>
      <Box cursor={'pointer'} fontSize={18}>
        <CommentLogo/>
      </Box>
    </Flex>
    <Text fontSize={'sm'} fontWeight={600}>
      {likes} likes
    </Text>
    <Flex alignItems={'center'} gap={2} justifyContent={'space-between'} w={'full'}>
      <InputGroup>
        <Input variant={'flushed'} placeholder ={"Add a comment..."} fontSize={14} />
        <InputRightElement>
          <Button
            fontSize={14}
            color={'blue'}
            fontWeight={600}
            cursor={'pointer'}
            _hover={{color:'white'}}
            bg={"transparent"}
            >
              Post
            </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
    
    </Box>
  )
}

export default FeedFooter
