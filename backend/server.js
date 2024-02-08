const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

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

// Routes
app.use('/classrooms', require('./routes/Classroom'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));