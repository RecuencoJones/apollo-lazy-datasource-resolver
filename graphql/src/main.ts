import { ApolloServer, gql } from 'apollo-server'
import { resolvers } from './resolvers'
import { VCS } from './datasources/vcs'

const typeDefs = gql `
type Project {
  id: ID!
  slug: String!
  name: String
  envs: [Environment]
}

type Environment {
  id: ID!
  name: String
  from: String!
  to: String!
  groups: [Group]
}

type Group {
  id: ID!
  name: String
  repos: [Repository]
}

type Repository {
  id: ID!
  slug: String!
  changes: RepositoryChanges
}

type RepositoryChanges {
  ahead: Int
  behind: Int
}

type Query {
  projects: [Project]
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    vcs: new VCS()
  }),
  tracing: true
})

server.listen().then(({ url }) => {
  console.log(`Listening on ${ url }`)
})
