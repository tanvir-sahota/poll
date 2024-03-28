//import all required components
const QuizResult = require("../models/quizResultsModel")
const mongoose = require('mongoose')
const Classroom = require("../models/ClassroomModel");

//Get all quizzes
const getAllQuizResults = async (request, response) => {
    const {classID} = request.params
    const classroom = await Classroom.findById(classID)
    const all_quiz_results = await QuizResult.find({})
    const quiz_results = all_quiz_results.filter(result => {
         return classroom.quizResultArray.includes(result._id)
    })
    response.status(200).json(quiz_results)
}

//Get a quiz based on its ID
const getOneQuizResult = async (request, response) => {
    const {classID} = request.params
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz result does not exist. ID not in correct format."})
    }

    const classroom = await Classroom.findById(classID)
    const quiz_results = classroom.quizResultArray

    const quiz_result = quiz_results.find(result => {
        return result._id = id;
    })

    if (!quiz_result) {
        return response.status(404).json({error: "Quiz result does not exist."})
    }

    response.status(200).json(quiz_result)
}

//Create a new quiz result
const createQuizResult = async (request, response) => {
    try {
        const {quiz} = request.body

        const quizResult = await QuizResult.create({
            quiz: quiz
        })

        console.log("Created quiz result")

        await Classroom.findByIdAndUpdate(quiz.classroom, { $push: {quizResultArray: quizResult}})

        response.status(201).json(quizResult)



    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

//Delete a quiz result based on its ID
const deleteQuizResult = async (request, response) => {
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz result does not exist. ID not in correct format."})
    }

    const deleted_quiz_result = await QuizResult.findOneAndDelete({_id: id})
    if (!deleted_quiz_result) {
        return response.status(404).json({error: "Quiz result does not exist."})
    }

    response.status(200).json(deleted_quiz_result)
}

//Delete all quiz result
const deleteAllQuizResults = async (request, response) => {
    const deleted_quiz_result = await QuizResult.deleteMany({})
    if (!deleted_quiz_result) {
        return response.status(404).json({error: "Quiz result does not exist."})
    }
    response.status(200).json(deleted_quiz_result)
}

//Update a quiz result
const patchQuizResult = async (request, response) => {
    const {id} = request.params

    const is_id_sanitised = mongoose.Types.ObjectId.isValid(id)
    if (!is_id_sanitised) {
        return response.status(404).json({error: "Quiz result does not exist. ID not in correct format."})
    }

    const updated_quiz_result = await QuizResult.findOneAndUpdate({_id: id}, {...request.body})
    if (!updated_quiz_result) {
        return response.status(404).json({error: "Quiz Result does not exist."})
    }

    response.status(200).json(updated_quiz_result)
}

//exports all quiz result functions/controllers
module.exports = {
    getAllQuizResults,
    getOneQuizResult,
    createQuizResult,
    deleteQuizResult,
    patchQuizResult,
    deleteAllQuizResults,
}