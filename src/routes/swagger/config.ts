import constants from '../../util/constants.js'

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Express Boilerplate',
      description: 'Swagger API description for Express Boilerplate',
      contact: {
        name: 'User',
      },
      servers: [`http://localhost:${constants.PORT}`],
      version: '1',
    },
  },

  apis: ['src/index.ts', 'src/routes/**/*.ts'],
}

export default swaggerOptions
