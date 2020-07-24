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

const Header = () => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <MainSpinner />

  if (data && data.currentUser) {
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
            <CategoryLink to="/profile">
              <UserIcon />
              {data ? data.currentUser.username : 'no user'}
            </CategoryLink>

            {/* TODO Create Logout Function with Cookies */}
            {/* <HeaderLink
              onClick={() => LogoutUser()}
              as="button"
              style={{ background: 'white' }}
            >
              <pre>SignOut</pre>
            </HeaderLink> */}
            {/* 
            <HeaderLink
              as="button"
              onClick={e => {
                setColorMode(colorMode === 'light' ? 'dark' : 'light')
              }}
            >
              {colorMode}
            </HeaderLink> */}
          </HeaderLinks>
        </HeaderNavWrapper>
      </HeaderContainer>
    )
  }
  return <NoAuthHeader />
}

export default Header
