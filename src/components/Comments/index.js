import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Spinner from '../shared/FallBackSpinner'
import { PostListContainer } from '../PostList/styles'
import {
  CommentsContainer,
  InputCommentBox,
  InputCommentFooter
} from './styles'
import { GET_POST_AND_COMMENTS } from './query'
import Post from '../Post'

function Comments({ postID }) {
  const { loading, error, data } = useQuery(GET_POST_AND_COMMENTS, {
    variables: { postID: postID }
  })

  if (loading) return <Spinner />
  if (error) return <h1>Error!</h1>

  const { post } = data

  return (
    <PostListContainer>
      <Post post={post} />
      <br />
      <InputCommentBox
        style={{ background: 'white' }}
        contentEditable='true'
        role='textbox'
        spellCheck='true'
        placeholder='Comment box with submission'
        height='300'
        width='300'
      ></InputCommentBox>
      <InputCommentFooter>
        <button>Submit</button>
      </InputCommentFooter>

      {/* TODO refactor this obviously */}

      {post.comments.map(comment => (
        <CommentsContainer key={comment.id}>
          <p>
            <strong>{comment.author.username}</strong>
          </p>
          <p>{comment.body}</p>
        </CommentsContainer>
      ))}
    </PostListContainer>
  )
}

export default Comments