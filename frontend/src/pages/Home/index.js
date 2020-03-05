import React from 'react'
import { FeedContainer, HomeContainer, SidebarContainer } from './styles.js'
import Categories from '../../components/Categories'

const HomePage = ({ children }) => (
  <HomeContainer>
    <FeedContainer>{children}</FeedContainer>
    <SidebarContainer>
      <Categories />
    </SidebarContainer>
  </HomeContainer>
)

export default HomePage
