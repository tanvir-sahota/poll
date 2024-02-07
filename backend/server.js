const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 3000;
const URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/virtualClassrooms', require('./routes/virtualClassroom'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));