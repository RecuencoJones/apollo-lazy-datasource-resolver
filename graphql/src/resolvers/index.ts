import { IResolvers } from 'apollo-server'
import { Query } from './query'
import { Repository } from './repository'

export const resolvers: IResolvers = {
  Query,
  Repository
}
