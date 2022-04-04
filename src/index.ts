import express from 'express'
import * as http from 'http'
import validateRequest from './middleware/validateRequest/index.js'
import evaluationGET from './routes/evaluationGET.js'
import initSwagger from './routes/swagger/index.js'
import constants from './util/constants.js'
import setDynamicThreadPool from './util/setDynamicThreadPool.js'

try {
  setDynamicThreadPool()
  const port = constants.PORT || 3000
  const app = express()
  const server = http.createServer(app)

  // Middleware
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(validateRequest)

  // Routes
  initSwagger(app)
  evaluationGET(app)

  server.listen(port, () => {
    console.info(`Server listening on port ${port}`)
  })
} catch (error) {
  console.error('global error', error)
}
