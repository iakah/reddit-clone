import React from 'react'
import { useQuery } from '@apollo/client'
import {
  CategoriesContainer,
  ContainerHeader,
  CategoryLink,
  CategoryLinksContainer,
} from './styles.js'
import MainSpinner from '../../shared/FallBackSpinner/index.js'
import { GET_CATEGORIES_QUERY } from '../../../graphql/Query/categories.js'

function Categories() {
  const { loading, error, data } = useQuery(GET_CATEGORIES_QUERY)

  if (loading) return <MainSpinner />

  if (error) return <div>Error</div>

  return (
    <CategoriesContainer>
      <ContainerHeader to="/chat">Chat</ContainerHeader>
      <ContainerHeader to="/submit">Post</ContainerHeader>
      <ContainerHeader to="/createCategory">Category</ContainerHeader>

      <CategoryLinksContainer>
        <CategoryLink to="/">r/all</CategoryLink>
        {data.categories.map((category) => (
          <CategoryLink
            to={`/r/${category.name}`}
            key={`sidebar-category-${category.id}`}
          >
            r/{category.name}
          </CategoryLink>
        ))}
      </CategoryLinksContainer>
    </CategoriesContainer>
  )
}

export default Categories