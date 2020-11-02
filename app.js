const express = require('express')
const app = express()
const {PORT} = require('./src/config/setting')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const routes = require('./src/routes')
swaggerDocument = require('./swagger.json')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

routes(app)

app.listen(PORT)
console.log('Nazarick Run on port: ' + PORT);