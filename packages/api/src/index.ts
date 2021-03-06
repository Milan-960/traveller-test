import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger/output.json'
import { endpoints } from './swagger'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { errorHandler } from './middleware/errorHandler'
import cors from 'cors'
// import { citiesRouter } from './cities/routes'
// import { getEndpointInfoHTML } from './utils'

export const app = express()

async function startApolloServer(typeDefs, resolvers) {
  const PORT = process.env.PORT || 8000
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.PORT !== 'production',
    plugins: [
      /* This plugin is from a package that's imported above. */
      // ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  // On production we have to set this plugins
  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  // ApolloServerPluginDrainHttpServer({ httpServer }),
  // })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
  })

  app.get('/', (req, res) => {
    res.send('hello world!! 💪  Welcome to the traveller-API!')
  })

  app.use(cors())
  app.use(express.json())
  endpoints()
  app.use('/rest', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(errorHandler)

  // app.use('/rest/cities', citiesRouter)
  // app.use('/rest', (_, res) => {
  //   res.send(getEndpointInfoHTML(app))
  // })
  // app.use(errorHandler)

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 GraphQL Server ready at https://travellerlist.herokuapp.com${server.graphqlPath}`)
  console.log(`🚀 REST Server ready at https://travellerlist.herokuapp.com/rest`)

  // console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  // console.log(`🚀 REST Server ready at http://localhost:${PORT}/rest`)
}

startApolloServer(typeDefs, resolvers)
