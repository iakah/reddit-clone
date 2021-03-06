import React from 'react'
import { useMutation } from '@apollo/client'
import {
  InputCommentBox,
  InputCommentFooter,
  Container,
  SubmitCommentButton,
} from './styles'
import MainSpinner from '../../shared/FallBackSpinner'
import { SUBMIT_COMMENT_MUTATION } from '../../../graphql/Mutation/submit_comment'

function CreateCommentForm({ postID, refetch }) {
  const [createComment, { loading, error }] = useMutation(
    SUBMIT_COMMENT_MUTATION
  )
  let input

  if (loading) return <MainSpinner />

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const result = await createComment({
        variables: { body: input.value, postID },
      })

      const { message, code } = result.data.createComment

      if (code === '200') {
        alert(message)
        refetch()
      }
      if (code === '401') {
        alert(message)
        refetch()
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  if (error) {
    return <div>Error! Return whence you came!</div>
  }

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <InputCommentBox
            ref={node => {
              input = node
            }}
            as="textarea"
            style={{ background: 'white' }}
            role="textbox"
            spellCheck="true"
            placeholder="What are your thoughts"
            height="300"
            width="300"
          />

          <InputCommentFooter>
            <SubmitCommentButton type="submit">Submit</SubmitCommentButton>
          </InputCommentFooter>
        </form>
      </Container>
    </>
  )
}

export default CreateCommentForm
