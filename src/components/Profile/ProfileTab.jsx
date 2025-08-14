import { Flex, Text, Box } from '@chakra-ui/react'
import {BsGrid3X3,BsBookmark,BsSuitHeart} from 'react-icons/bs'
import React from 'react'

function ProfileTab() {
  return (
    <Flex w={'full'} justifyContent={'center'} gap={10} textTransform={'uppercase'} fontWeight={'bold'} mt={2} mb={2}>
      <Flex alignItems={'center'} pd='3' gap={1} cursor={'pointer'}>
        <Box fontSize={20}>
          <BsGrid3X3/>
        </Box>
        <Text fontSize={12} display={'block'}>
          Posts
        </Text>
      </Flex>  
      <Flex alignItems={'center'} pd='3' gap={1} cursor={'pointer'}>
        <Box fontSize={20}>
           <BsBookmark/>
        </Box>
        <Text fontSize={12} display={'block'}>
          Saved
        </Text>
      </Flex>  
      <Flex  alignItems={'center'} pd='3' gap={1} cursor={'pointer'}>
        <Box fontSize={20}>
          <BsSuitHeart fontWeight={'bold'}/>
        </Box>
        <Text fontSize={12} display={'block'}>
          Likes
        </Text>
      </Flex>  
    </Flex>
  )
}

export default ProfileTab
