import * as express from 'express'
import { random } from 'faker'

const data = require('../data.json')

const app = express()

app.get('/projects', (req, res) => {
  res.json(data)
})

app.get('/changes/:project/:repo/:branch', (req, res) => {
  // const { project, repo, branch } = req.params
  // const { compare } = req.query

  res.json({
    ahead: random.number({ min: 0, max: 20 }),
    behind: random.number({ min: 0, max: 20 })
  })
})

app.listen(8080)
