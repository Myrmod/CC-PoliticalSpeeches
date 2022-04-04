import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from './config.js'
import * as core from 'express-serve-static-core'
const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default function initSwagger(app: core.Express) {
  try {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  } catch (error) {
    console.error('Swagger error', error)
  }
}
