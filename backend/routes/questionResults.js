const express = require('express');
const {createQuestionResults} = require("../controllers/questionResultsController");
const User = require("../models/userModel");
const router = express.Router();

router.post('/', createQuestionResults)

module.exports = router;