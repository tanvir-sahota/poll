const Quiz = require("../models/quiz_model")

// used to sanitise :id input
const mongoose = require('mongoose')

// Paths are relative to /api/quizzes, e.g. the below is /api/quizzes/

// Retrieves all of the quizzes
const get_all_quizzes = async (request, response) => {
    const quizzes = await Quiz.find({})
    response.status(200).json(quizzes)
}

// Retrieves a single quiz
const get_one_quiz = async (request, response) => {
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz does not exist. ID not in correct format."})
    }

    const quiz = await Quiz.findById(id)
    if (!quiz) {
        return response.status(404).json({error: "Quiz does not exist."})
    }

    response.status(200).json(quiz)
}

// Post a new quiz
const create_quiz = async (request, response) => {
    const {title, description, folder,num_questions, questions, classroom} = request.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    // if (!description){
    //     emptyFields.push('description')
    // }

    if (emptyFields.length > 0) {
        return response.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const quiz = await Quiz.create({title, description, folder,num_questions, questions, classroom})
        response.status(201).json(quiz)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

// Delete a quiz
const delete_quiz = async (request, response) => {
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz does not exist. ID not in correct format."})
    }

    const deleted_quiz = await Quiz.findOneAndDelete({_id: id})
    if (!deleted_quiz) {
        return response.status(404).json({error: "Quiz does not exist."})
    }

    response.status(200).json(deleted_quiz)
}

// Delete a quiz
const delete_all_quizzes = async (request, response) => {
    const deleted_quiz = await Quiz.deleteMany({})
    if (!deleted_quiz) {
        return response.status(404).json({error: "Quiz does not exist."})
    }
    response.status(200).json(deleted_quiz)
}

// Update a quiz
const patch_quiz = async (request, response) => {
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz does not exist. ID not in correct format."})
    }

    const updated_quiz = await Quiz.findOneAndUpdate({_id: id}, {...request.body})
    if (!updated_quiz) {
        return response.status(404).json({error: "Quiz does not exist."})
    }

    response.status(200).json(updated_quiz)
}

module.exports = {
    get_all_quizzes,
    get_one_quiz,
    create_quiz,
    delete_quiz,
    patch_quiz,
    delete_all_quizzes,
}