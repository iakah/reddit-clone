import React from 'react'
import { PostListContainer } from './styles'
import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS } from './query'
import Spinner from '../shared/FallBackSpinner'
import Post from '../Post'

function AllPosts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS)

  if (loading) return <Spinner />
  if (error) return <h1>Error!</h1>

  return (
    <PostListContainer>
      {data.posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </PostListContainer>
  )
}

export default AllPosts