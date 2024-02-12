require('dotenv').config()

const express = require('express')
const path = require("path")
const app = express()
const port = 4000
const mongoose = require('mongoose')

const questionRoutes = require("./routes/questions")

app.use(express.json())

app.use((req, res, next) => {
  console.log(req,path, req.method)
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