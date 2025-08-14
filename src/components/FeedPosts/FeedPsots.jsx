import React from 'react'
import {Container} from '@chakra-ui/react'
import FeedPost from './FeedPost'

function FeedPsots() {
  return (
    <Container py={10} px={2} maxW={"container.sm"}>
      <FeedPost img= "/img1.png"  avatar="/img1.png"  username="User1"/>
      <FeedPost img= "/img2.png"  avatar="/img2.png"  username="USer2"/>
      <FeedPost img= "/img3.png"  avatar="/img3.png"  username="User3"/>
      <FeedPost img= "/img4.png"  avatar="/img4.png"  username="USer4"/>
    </Container>
  )
}

export default FeedPsots
