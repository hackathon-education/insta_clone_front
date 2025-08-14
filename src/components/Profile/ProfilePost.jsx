import React from 'react'
import { Flex, GridItem, Image, Text } from '@chakra-ui/react'
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,useDisclosure, Box, Avatar, Divider, VStack} from '@chakra-ui/react'
import {MdDelete} from "react-icons/md"
import Comment from '../Comment'
import FeedFooter from '../FeedPosts/FeedFooter'
function ProfilePost({img}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  <>
    <GridItem cursor={'pointer'} borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} position={'relative'} aspectRatio={1/1}>
        <Flex 
        opacity={0}
        _hover={{opacity:1}}
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={'blackAlpha.700'}
        transition={'all 0.3s ease'}
        zIndex={1}
        justifyContent={'center'}
        onClick={onOpen}
        >
            <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
              <Flex>
                <AiFillHeart size={20}/>
                <Text fontWeight={'bold'} ml={2}>
                  7
                </Text>
              </Flex>
              <Flex>
                <FaComment size={20}/>
                <Text fontWeight={'bold'} ml={2}>
                  7
                </Text>
              </Flex>
            </Flex>
        </Flex> 

        <Image src={img} w={'100%'} h={'100%'} objectFit={'cover'}/>
    </GridItem>
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'5xl'}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody bg={'black'} pb={5}>
        <Flex gap={4} w={'full'} mx={'auto'}>
          <Box borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} flex={1.5}>
            <Image src={img} alt='Posts'/>
          </Box>
          <Flex flex={1} flexDir={'column'} px={10} display={'flex'}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={4}>
              <Avatar src='/profilepic.png' size={'sm'} name='Aditya'/>
              <Text fontWeight={'bold'} fontSize={12}>
                Aditya
              </Text>
            </Flex>
              <Box _hover={{bg:'whiteAlpha.300',color:'red.600'}} borderRadius={4} p={1}>
                <MdDelete size={20} cursor={"pointer"}/>
              </Box>
              </Flex>
              <Divider my={4} bg={'gray.500'}/>
              <VStack w='full' alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                <Comment
                createdAt="1d ago"
                username="user1"
                profilePic='/profilepic.png'
                text={'Dummy images'}
                />
                <Comment
                createdAt="16d ago"
                username="user31"
                profilePic='/profilepic.png'
                text={'Dummy images'}
                />
                <Comment
                createdAt="12d ago"
                username="user31"
                profilePic='/img2.png'
                text={'Dummy images'}
                />
                <Comment
                createdAt="11d ago"
                username="user12"
                profilePic='/img1.png'
                text={'Dummy images'}
                />
                
              </VStack>
              <Divider my={4} bg={'gray.500'}/>
              <FeedFooter />
          </Flex>
        </Flex>
      </ModalBody>
    </ModalContent>
  </Modal>
  </>
  )
}

export default ProfilePost
