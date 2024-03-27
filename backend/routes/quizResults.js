const express = require('express')
const {
    getAllQuizResults, getOneQuizResult, createQuizResult, deleteQuizResult, patchQuizResult,
    deleteAllQuizResults,
} = require('../controllers/quizResultsController')
const Quiz = require("../models/quiz_model")

const router = express.Router()

router.get('/:classID', getAllQuizResults)

router.get('/:classID/:id', getOneQuizResult)

router.post('/', createQuizResult)

router.delete('/:id', deleteQuizResult)

router.patch('/:id', patchQuizResult)

router.delete('/', deleteAllQuizResults)

module.exports = router