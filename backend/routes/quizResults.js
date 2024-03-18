const express = require('express')
const {
    getAllQuizResults, getOneQuizResult, createQuizResult, deleteQuizResult, patchQuizResult,
    deleteAllQuizResults,
} = require('../controllers/quizResultsController')
const Quiz = require("../models/quiz_model")

const router = express.Router()

// Paths are relative to /api/quizzes, e.g. the below is /api/quizzes/

// Retrieves all of the quizzes
router.get('/', getAllQuizResults)

// Retrieves a single quiz
router.get('/:id', getOneQuizResult)

// Post a new quiz
router.post('/', createQuizResult)

// Delete a quiz
router.delete('/:id', deleteQuizResult)

// Update a quiz
router.patch('/:id', patchQuizResult)

// Delete all quizzes
router.delete('/', deleteAllQuizResults)

module.exports = router