const mongoose = require('mongoose') // npm install mongoose 

const configureDB = () => {
    // connect to the database
    mongoose.connect('mongodb://localhost:27017/jan-db', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log('error', err)
        })
}

module.exports = configureDB