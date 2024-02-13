require('dotenv').config()

const express = require('express')
const cors = require('cors')
const quizRoutes = require('./routes/quizzes')
const app = express()
const port = 3000

const mongoose = require('mongoose')

const allowEveryOrigin = true

if (!allowEveryOrigin)
{
  //Only allows requests from one host for security, enable in production
  const corsOptions = { 
    origin : ['http://localhost:3000'], 
  } 
  app.use(cors(corsOptions))
}
else
{
  //Allows CORS from everywhere for development
  app.use(cors())
}





app.use(express.json())

app.use('/api/quizzes', quizRoutes)




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfuly connected to database.')

    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

    // routes

    // uses routes specified in the quizzes.js file

  })
  .catch((err) => {
    console.log(err)
  })


module.exports = app