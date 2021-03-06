import React from 'react'
import styled from 'styled-components'
import { UpArrowSquare, DownArrowSquare } from '@styled-icons/boxicons-solid'
import { useMutation } from '@apollo/client'
import { Container, Votes } from './styles'
import { VOTE_ON_POST_MUTATION } from '../../../graphql/Mutation/votes'

const UpArrow = styled(UpArrowSquare)`
  &:hover {
    color: red;
  }
`

const DownArrow = styled(DownArrowSquare)`
  &:hover {
    color: red;
  }
`

const VoteBox = ({ score, postID }) => {
  const [createVote, { error }] = useMutation(VOTE_ON_POST_MUTATION)

  if (error) {
    console.log(error)
  }

  return (
    <Container>
      <UpArrow
        onClick={() => {
          createVote({
            variables: { postID, type: 1 },
          })
        }}
      />
      <Votes>{score}</Votes>
      <DownArrow
        onClick={() => {
          createVote({
            variables: { postID, type: -1 },
          })
        }}
      />
    </Container>
  )
}
export default VoteBox
