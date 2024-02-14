const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

require('dotenv').config();

const app = express();
const PORT = 4000;
const URI = process.env.MONGO_URI;
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

// MongoDB Connection
mongoose.connect(URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// connect frontend
const dirName = path.dirname("")
const buildPath = path.join(dirName, "../frontend/build");

// Routes
app.use(express.static(buildPath))
app.use('/classrooms', require('./routes/Classroom'));
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


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports=app