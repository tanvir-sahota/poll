const express = require('express');
const {createQuizResults} = require("../controllers/quizResultsController");
const User = require("../models/userModel");
const router = express.Router();

router.post('/', createQuizResults)

module.exports = router;