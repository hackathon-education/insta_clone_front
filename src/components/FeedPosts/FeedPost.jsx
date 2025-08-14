import React, { useEffect, useState } from 'react'
import { Box, Image, Skeleton, SkeletonCircle, VStack,Container,Flex } from '@chakra-ui/react'
import FeedHeader from './FeedHeader'
import FeedFooter from './FeedFooter'


function FeedPost({img,username,avatar}) {
  const[isLoading,setLoading] = useState(true);
    useEffect(()=>
    {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    },[])
 
  return (
    <Container maxW={"container.sm"}  px={2} >
      {/* {isLoading && [0,1,2,3].map((_,idx) =>
        {
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size={10}/>
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'}/>
                <Skeleton height={'10px'} w={'200px'}/>
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'500px'}>
                CONTENTS WRAPPED
              </Box>
            </Skeleton>
          </VStack>
        }
      )} */}
      {/* {!isLoading && ( */}
        
        <FeedHeader username={username}  avatar={avatar}/>
         <Box overflow={'hidden'} borderRadius={4} my={2}>
          <Image src={img} w={'300px'}></Image>
        </Box>
        <FeedFooter/>
      
      {/* )} */}
    
    </Container>
    
  )
}

export default FeedPost
