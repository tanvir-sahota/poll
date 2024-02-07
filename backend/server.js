const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 4000;
const URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/classrooms', require('./routes/Classroom'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));