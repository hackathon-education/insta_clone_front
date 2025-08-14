import React from 'react'
import {Avatar,AvatarGroup,Button,Flex, VStack,Text} from'@chakra-ui/react'

function ProfileHeader() {
  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:'column',sm:'row'}}>
        <AvatarGroup size={{base:'xl',md:'2xl'}} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
            <Avatar src='/profilepic.png' name='Aditya'/>
        </AvatarGroup>
        <VStack alignItems={'start'} gap={2} flex={1} justifyContent={'center'}>
            <Flex gap={4} direction={{base:'column',sm:'row'}} justifyContent={{base:'center',sm:"flex-start"}} alignItems={'center'} w={'full'}>
                <Text fontSize={'lg'}>
                        Aditya
                </Text>
                <Flex gap={4} alignItems={'center'} justifyContent={'center'} ml={25} >
                    <Button bg={'white'} color={'black'} _hover={{bg:"whiteAlpha.800"}} size={'sm'} >
                        Edit Profile
                    </Button>
                </Flex>
            </Flex>
            <Flex alignItems={'center'} gap={4}>
                <Text>
                    <Text as="span" fontWeight={"bold"} mr={1}>4</Text>
                    Posts
                </Text>
                <Text>
                    <Text as="span" fontWeight={"bold"} mr={1}>149787</Text>
                    Followers
                </Text>
                <Text>
                    <Text as="span" fontWeight={"bold"} mr={1}>0</Text>
                    Following
                </Text>    
            </Flex>
            <Flex alignItems={'center'} gap={4}>
                <Text fontSize={'sm'} fontWeight={'bold'}>Just chilling</Text>
            </Flex>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader
