import React from 'react'
import{Box, Container, Flex} from '@chakra-ui/react'
import FeedPsots from '../components/FeedPosts/FeedPsots'
import SuggestionPosts from '../components/SuggestionFeed/SuggestionPosts'

function HomePage() {
  return (
    <Container maxW={"container.lg"}>
        <Flex gap={20}>
            <Box flex={2} ml={300} maxW={'300px'} >
              <FeedPsots/>
            </Box>
            <Box flex={3} mr={20}  maxW={"300px"} display={{base:"none",lg:"block"}}>
            <SuggestionPosts/>
            </Box>
        </Flex>
    </Container>
  )
}

export default HomePage
