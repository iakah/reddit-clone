import styled from '@xstyled/styled-components'

export const InputCommentBox = styled.input`
  overflow: hidden;
  padding: 8px 16px;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 1px solid #ebedf0;
  background: #ffffff;
  border-radius: 5rpx;
  min-width: 500rpx;
  display: block;
  width: 100%;
  display: flex;
  vertical-align: baseline;
  word-break: break-word;
  &:hover {
    border: 1px solid #6b6969;
  }
`

export const InputCommentFooter = styled.div`
  display: flex;
  border: 1px solid #ebedf0;
  background: #ebedf0;
  border-radius: 5rpx;
  width: 100%;
  align-self: flex-end;
`