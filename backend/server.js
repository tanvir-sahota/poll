require('dotenv').config()


const mongoose = require('mongoose')
const app = require('./app')
const port = 4000
const cors = require('cors')


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