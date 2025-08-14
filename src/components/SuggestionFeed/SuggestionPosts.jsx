import React from 'react'
import SuggestionHeader from './SuggestionHeader'
import SuggestionPost from './SuggestionPost'

function SuggestionPosts() {
  return (
    <div>
      <SuggestionHeader/>
      <SuggestionPost avatar="/img1.png"  username="User1"/>
      <SuggestionPost avatar="/img2.png"  username="User2"/>
      <SuggestionPost avatar="/img3.png"  username="User3"/>
      <SuggestionPost avatar="/img4.png"  username="USer4"/>
    </div>
  )
}

export default SuggestionPosts
