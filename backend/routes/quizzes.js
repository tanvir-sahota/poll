const express = require('express')
const {
    get_all_quizzes,
    get_one_quiz,
    create_quiz,
    delete_quiz,
    delete_all_quizzes,
    patch_quiz,
} = require('../controllers/quiz_controller')
const Quiz = require("../models/quiz_model")

const router = express.Router()

// Paths are relative to /api/quizzes, e.g. the below is /api/quizzes/

// Retrieves all of the quizzes
router.get('/', get_all_quizzes)

// Retrieves a single quiz
router.get('/:id', get_one_quiz)

// Post a new quiz
router.post('/', create_quiz)

// Delete a quiz
router.delete('/:id', delete_quiz)

// Update a quiz
router.patch('/:id', patch_quiz)

// Delete all quizzes
router.delete('/', delete_all_quizzes)

module.exports = router