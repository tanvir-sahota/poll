require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfuly connected to database.')

    app.use(express.json())

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })

  })
  .catch((err) => {
    console.log(err)
  }) 
  