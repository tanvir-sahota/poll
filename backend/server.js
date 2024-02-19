require('dotenv').config()
const mongoose = require('mongoose')

const app = require('./app')
const port = 4000

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Successfully connected to database in server.js')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })


module.exports = app