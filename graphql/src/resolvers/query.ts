import { IResolverObject } from 'apollo-server'
import { VCSResolver } from '../datasources/vcs'

const projects: VCSResolver = (source, args, { dataSources }) => dataSources.vcs.getProjects()

export const Query: IResolverObject = {
  projects
}
