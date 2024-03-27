const express = require('express')
const {
    get_all_quizzes,
    get_one_quiz,
    create_quiz,
    delete_quiz,
    delete_all_quizzes,
    patch_quiz,
    drag_quiz_to_folder
} = require('../controllers/quiz_controller')
const Quiz = require("../models/quiz_model")

const router = express.Router()

router.get('/', get_all_quizzes)

router.get('/:id', get_one_quiz)

router.post('/', create_quiz)

router.delete('/:id', delete_quiz)

router.patch('/:id', patch_quiz)

router.delete('/', delete_all_quizzes)

module.exports = router