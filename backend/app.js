const express = require("express")
const cors = require("cors")

// express.json() is used when request has json body
const app = express()
app.use(express.json())

// all api routes
const quizRoutes = require('./routes/quizzes')
app.use('/api/quizzes', quizRoutes)

// change to false in production
const allowEveryOrigin = true
if (!allowEveryOrigin) {
    // only allows requests from one host for security, enable in production
    const corsOptions = {
        origin: ['http://localhost:4000'],
    }
    app.use(cors(corsOptions))
} else {
    // allows CORS from everywhere for development
    app.use(cors())
}

module.exports = app