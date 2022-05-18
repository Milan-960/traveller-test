import swaggerAutogen from 'swagger-autogen'

const city = {
  id: 1,
  name: 'Milan',
  country: 'Italy',
  visited: false,
  wishlist: true,
}

const doc = {
  info: {
    version: '0.1.0',
    title: 'Traveller API',
    description: 'Smartpension Traveller Rest API',
  },
  host: 'travellerlist.herokuapp.com',
  definitions: {
    City: city,
    Cities: [city],
  },
}

const outputFile = './src/swagger/output.json'
const endpointsFiles = ['./src/swagger/endpoints.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
