import React from 'react'
import { Grid } from '@chakra-ui/react'
import ProfilePost from './ProfilePost'


function ProfilePosts({img}) {
  return (
    <> 
    <Grid templateColumns={'repeat(3,1fr)'} gap={1} columnGap={1} >
        <ProfilePost img='/img1.png'/>
        <ProfilePost img='/img2.png'/>
        <ProfilePost img='/img3.png'/>
        <ProfilePost img='/auth.png'/>
    </Grid>
    
    </>
  )
}

export default ProfilePosts
