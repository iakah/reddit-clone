import { gql } from '@apollo/client'

export const UPDATE_COMMENT_MUTATION = gql`
  mutation onUpdateComment($postID: ID!, $commentID: ID!) {
    updateComment(data: { postID: $postID, commentID: $commentID }) {
      code
      message
      success
      comment {
        id
        body
        createdAt
        updatedAt
        createdBy {
          id
          username
        }
      }
    }
  }
`
