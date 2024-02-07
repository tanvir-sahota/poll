require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const userRoutes = require('./routes/users')

const mongoose = require('mongoose')

app.use(cors())

app.use('/api/users', userRoutes)

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