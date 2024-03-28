//import all required components
const express = require('express')
const {
    getAllQuizResults, getOneQuizResult, createQuizResult, deleteQuizResult, patchQuizResult,
    deleteAllQuizResults,
} = require('../controllers/quizResultsController')
const Quiz = require("../models/quiz_model")

const router = express.Router()

//defines all api request urls to access controllers 
router.get('/:classID', getAllQuizResults)
router.get('/:classID/:id', getOneQuizResult)
router.post('/', createQuizResult)
router.delete('/:id', deleteQuizResult)
router.patch('/:id', patchQuizResult)
router.delete('/', deleteAllQuizResults)

//Export questions router module
module.exports = router