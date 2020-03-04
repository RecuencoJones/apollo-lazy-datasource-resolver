import { IFieldResolver } from 'apollo-server'
import { RESTDataSource } from 'apollo-datasource-rest'

export type VCSResolver<TSource = any> = IFieldResolver<TSource, { dataSources: { vcs: VCS } }>

export class VCS extends RESTDataSource {
  constructor() {
    super()

    this.baseURL = process.env.API_HOST
  }

  async getProjects() {
    const projects = await this.get('projects')

    return projects.map(({ groups, envs, ...project }) => ({
      ...project,
      envs: envs.map((env) => ({
        ...env,
        groups: groups.map(({ repos, ...group }) => ({
          ...group,
          repos: repos.map((repo) => ({
            ...repo,
            _lazy: {
              changes: () => this.get(`changes/${ project.slug }/${ repo.slug }/${ env.from }?compare=${ env.to }`)
            }
          }))
        }))
      }))
    }))
  }
}
