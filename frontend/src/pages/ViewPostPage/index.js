import React from 'react'
import CommentsPageWithData from './CommentsPage/CommentsPageWithData'
import PostPageWithData from './PostPage/PostPageWithData'
import { PostAndCommentsContainer } from './styles'

export default function PostAndCommentsPage({ postID }) {
  return (
    <PostAndCommentsContainer>
      <PostPageWithData postID={postID} />

      <CommentsPageWithData postID={postID} />
    </PostAndCommentsContainer>
  )
}
