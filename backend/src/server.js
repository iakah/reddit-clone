/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import "core-js/stable"
import "regenerator-runtime/runtime"

import {
  ApolloServer,
  AuthenticationError,
  PubSub,
} from "apollo-server-express"

import express from "express"
import cors from "cors"
import http from "http"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

import { makeExecutableSchema } from "@graphql-tools/schema"
import db from "./context/index"
import resolvers from "./resolvers/root"
import typeDefs from "./schema.graphql"

import {
  getUser,
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "./utils"

const app = express()

// const whitelist = [
//   "http://localhost:3000",
//   "https://localhost:3000",
//   "http://reddit-frontend-r93w8ffn7.vercel.app",
//   "http://reddit-frontend.coreyburns.now.sh",
//   "http://reddit-frontend.now.sh",
//   "http://reddit-frontend.coreyburns.vercel.app",
//   "https://reddit-frontend.coreyburns.now.sh",
//   "https://reddit-frontend.now.sh",
//   "https://reddit-frontend.coreyburns.vercel.app",
//   "https://reddit-frontend-r93w8ffn7.vercel.app"
// ]

// function corsWhiteList(origin, callback) {
//   if (whitelist.indexOf(origin) !== -1) {
//     callback(null, true)
//   } else {
//     callback(new Error("Not allowed by CORS"))
//   }
// }

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
}

app.use(cookieParser())

app.post("/refresh_token", cors(corsOptions), async (req, res) => {
  const token = req.cookies.redt

  if (!token) {
    return res.send({ ok: false, accessToken: "" })
  }

  let payload = null

  try {
    payload = jwt.verify(token, process.env.JWT_REFRESH)
  } catch (error) {
    return res.send({ ok: false, accessToken: "" })
  }

  const user = await db.query.user({
    where: {
      id: payload.userID,
    },
  })

  if (!user) {
    return res.send({ ok: false, accessToken: "" })
  }
  await sendRefreshToken(res, createRefreshToken(user))

  return res.send({ ok: true, accessToken: createAccessToken(user) })
})

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

const pubsub = new PubSub()

const server = new ApolloServer({
  schema,
  context: async ({ req, res, connection }) => {
    if (connection) {
      return {
        ...connection.context,
        db,
      }
    }

    return {
      ...req,
      ...res,
      pubsub,
      user: await getUser(req),
      db,
    }
  },
  subscriptions: {
    path: "/subscriptions",
    onConnect: async (connectionParams, webSocket, context) => {
      console.log(
        `Subscription client connected using Apollo server's built-in SubscriptionServer.`
      )
    },
    onDisconnect: async (webSocket, context) => {
      console.log(`Subscription client disconnected.`)
    },
  },
  introspection: true,
  playground: true,
})

server.applyMiddleware({ app, cors: corsOptions })

const PORT = process.env.PORT || 4000

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at https://localhost:${PORT}${server.graphqlPath}`
  )
  console.log(
    `🚀 Subscriptions ready at wss://localhost:${PORT}${server.subscriptionsPath}`
  )
})
