const express = require('express') // npm install express
const app = express()
var useragent = require('express-useragent')
const configureDB = require('./config/database')

const router = require('./config/routes')
const port = 3055

app.use(express.json())

app.use(useragent.express())

app.use('/', router)
configureDB() 

app.listen(port, () => {
    console.log('listening on port', port)
})

