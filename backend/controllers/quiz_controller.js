const express = require('express')
const Quiz = require("../models/quiz_model")

// Paths are relative to /api/quizzes, e.g. the below is /api/quizzes/

// Retrieves all of the quizzes
const get_all_quizzes = async (request, response) => {
    const quizzes = await Quiz.find({})
    response.status(200).json(quizzes)
}

// Retrieves a single quiz
const get_one_quiz = async (request, response) => {
    const {id} = req.params
    const quiz = await Quiz.findById(id)

    if(!quiz){
        return response.status(404).json({error: "Quiz does not exist."})
    }
    
    response.status(200).json(quiz)
}

// Post a new quiz
const create_quiz = async (request, response) => {
    const {title, description, num_questions, questions} = request.body
    try{
        const quiz = await Quiz.create({title, description, num_questions, questions})
        response.status(200).json(quiz)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// Delete a quiz
const delete_quiz = (request, response) => {
    response.json({mssg: 'DELETE a quiz'})
}

// Update a quiz
const patch_quiz = (request, response) => {
    response.json({mssg: 'UPDATE a quiz'})
}

module.exports = {
    get_all_quizzes,
    get_one_quiz,
    create_quiz,
    delete_quiz,
    patch_quiz,
}