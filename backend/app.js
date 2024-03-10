require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require("path")
const app = express()
const mongoose = require('mongoose')

const allowEveryOrigin = true;
const URI = process.env.MONGO_URI;


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

const quizRoutes = require('./routes/quizzes')
const questionRoutes = require("./routes/questions")
const classroomRoutes = require('./routes/Classroom')
const userRoutes = require('./routes/users')
const folderRoutes = require('./routes/folders')


app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfuly connected to database.')

    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
  })
  .catch((err) => {
    console.log(err)
  }) 

// connect frontend
// const dirName = path.dirname("")
const buildPath = path.join(__dirname, "../frontend/build");



// Routes
app.use(express.static(buildPath))
app.use('/api/folders',folderRoutes)
app.use("/api/questions", questionRoutes)
app.use('/api/classrooms', classroomRoutes);
app.use('/api/users', userRoutes)
app.use('/api/quizzes', quizRoutes)
app.get("/*", function(req,res){
  res.sendFile(
    path.join(buildPath,"index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  )
})
module.exports = app
