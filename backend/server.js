require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require("path")
const app = express()
const port = 4000
const mongoose = require('mongoose')

const allowEveryOrigin = true;

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

const questionRoutes = require("./routes/questions")

app.use(express.json())

app.use((req, res, next) => {
  //console.log(req,path, req.method)
  next()
})

//routes
app.use("/api/questions", questionRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfuly connected to database.')
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

  })
  .catch((err) => {
    console.log(err)
  }) 

  module.exports = app