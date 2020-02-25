import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { posts, categories, users, comments } from './data'
import { v4 as uuidv4 } from 'uuid'

const resolvers = {
  Query: {
    user: (_, { userID }) => users.find(u => u.id === userID),
    users: () => users,
    categories: () => categories,
    post: (_, { postID }) => posts.find(p => p.id === postID),
    posts: (_, { category }) =>
      !category ? posts : posts.filter(p => p.category === category),
    comments: () => comments
  },

  Mutation: {
    createUser: (_, { data: { username, email } }) => {
      if (users.some(user => user.email === email)) {
        throw new Error('Email taken.')
      }
      const user = {
        id: uuidv4(),
        email,
        username
      }
      users.push(user)
      return user
    },
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex(user => user.id === id)
      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUser = users.splice(userIndex, 1)
      return deletedUser[0]
    },
    createPost: (_, { data: { category, author, title, url } }) => {
      const post = {
        id: uuidv4(),
        type: 'link',
        published: true,
        votes: Math.floor(Math.random() * Math.floor(100)),
        category,
        author,
        title,
        url
      }
      posts.push(post)
      return post
    },
    deletePost: (_, { id }) => {
      const postIndex = posts.findIndex(post => post.id === id)
      if (postIndex === -1) {
        throw new Error('post does not exist!')
      }

      const deletedPost = posts.splice(postIndex, 1)
      return deletedPost[0]
    },
    createComment: (_, { data: { postID, body, author } }) => {
      const comment = {
        id: uuidv4(),
        postID,
        body,
        author
      }
      comments.push(comment)
      return comment
    },
    deleteComment: (_, { id }) => {
      const commentIndex = comments.findIndex(c => c.id === id)
      if (commentIndex === -1) {
        throw new Error('comment does not exist!')
      }

      const deletedComment = comments.splice(commentIndex, 1)
      return deletedComment[0]
    }
  },

  Post: {
    author: ({ author }, _) => users.find(user => user.username === author),
    comments: ({ id }, _) => comments.filter(c => c.postID === id)
  },

  User: {
    posts: ({ username }, _) => posts.filter(p => p.author === username),
    comments: ({ username }, _) => comments.filter(c => c.author === username)
  },
  Comment: {
    author: ({ author }, _) => users.find(u => u.username === author)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🧨  Server ready at ${url} `)
})
