import { ApolloServer } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './typedefs/index'
import db from './context'
import resolvers from './resolvers/root'
import { getUser } from './utils'
import { applyMiddleware } from 'graphql-middleware'
require('dotenv').config()

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  })
)

const server = new ApolloServer({
  schema,
  context: req => ({
    ...req,
    user: getUser(req),
    db
  })
})
  .listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })
