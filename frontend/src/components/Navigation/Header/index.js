import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from '@reach/router'
import {
  HeaderContainer,
  HeaderNavWrapper,
  HeaderLogo,
  HeaderLinks,
  UserIcon,
  FullLogo,
  HalfLogo,
} from './styles'
import MainSpinner from '../../shared/FallBackSpinner'
import { CURRENT_USER_QUERY } from '../../../graphql/Query/current_user'
import NoAuthHeader from '../NoAuthHeader'
import { CategoryLink } from '../../Categories/styles'
import { useAuth } from '../../../context/auth-context'

const Header = () => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY)

  const { user } = useAuth()
  if (loading) return <MainSpinner />

  if (data && data.currentUser) {
    return (
      <HeaderContainer as="header">
        <HeaderNavWrapper>
          <HeaderLogo>
            <Link to="/">
              <FullLogo />
              <HalfLogo />
            </Link>
          </HeaderLogo>

          <HeaderLinks>
            <CategoryLink to={`/profile/${data.currentUser.id}`}>
              <UserIcon />
              {data.currentUser.username}
            </CategoryLink>
          </HeaderLinks>
        </HeaderNavWrapper>
      </HeaderContainer>
    )
  }
  if (user !== null) {
    return (
      <HeaderContainer>
        <HeaderNavWrapper>
          <HeaderLogo>
            <Link to="/">
              <FullLogo />
              <HalfLogo />
            </Link>
          </HeaderLogo>

          <HeaderLinks>
            <CategoryLink to={`/profile/${user}`}>
              <UserIcon />
              {user}
            </CategoryLink>
          </HeaderLinks>
        </HeaderNavWrapper>
      </HeaderContainer>
    )
  }
  return <NoAuthHeader />
}

export default Header
