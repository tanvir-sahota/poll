const express = require('express')

const router = express.Router()

// Paths are relative to /api/quizzes, e.g. the below is /api/quizzes/

// Retrieves all of the quizzes
router.get('/', (request, response) => {
    response.json({mssg: 'GET all quizzes'})
})

// Retrieves a single quiz
router.get('/:id', (request, response) => {
    response.json({mssg: 'GET a single quiz'})
})

// Post a new quiz
router.post('/', (request, response) => {
    //request.body
    response.json({mssg: 'POST a new quiz'})
})

// Delete a quiz
router.delete('/:id', (request, response) => {
    response.json({mssg: 'DELETE a quiz'})
})

// Update a quiz
router.patch('/:id', (request, response) => {
    response.json({mssg: 'UPDATE a quiz'})
})

module.exports = router