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

app.use(express.json())

// app.use((req, res, next) => {
//   //console.log(req,path, req.method)
//   next()
// })

// MongoDB Connection
mongoose.connect(URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// connect frontend
const dirName = path.dirname("")
const buildPath = path.join(dirName, "../frontend/build");


// Routes
app.use(express.static(buildPath))
app.use("/api/questions", questionRoutes)
app.use('/api/classrooms', classroomRoutes);
app.use('/api/quizzes', quizRoutes)
app.get("/*", function(req,res){
  res.sendFile(
    path.join(dirName,"../frontend/build/index.html"),
    function(err){
      if(err){
        res.status(500).send(err);
      }
    }
  )
})
module.exports = app
