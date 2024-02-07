const Question = require("../models/questionModel")
const mongoose = require("mongoose")

//Get all questions
const getAllQuestions = async (request, response) => {
    const questions = await Question.find({}).sort({createdAt : -1})
    response.status(200).json(questions)
}

//Get a question
const getQuestion = async (request, response) => {
    const {id} = request.params

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Question doesn't Exist"})
    }

    const question = await Question.findById(id)

    if(!question){
        return response.status(404).json({error: "Question doesn't exist"})
    }

    response.status(200).json(workout)
}

//Post request to create workout
const createQuestion = async (request, response) => {
    const {question, options, answers} = request.body

    let emptyFields = []

    if(!question){
        emptyFields.push("questions")
    }
    if(!options){
        emptyFields.push("options")
    }
    if(!answers){
        emptyFields.push("answers")
    }
    if(emptyFields.length > 0){
        return response.status(400).json({ error: "Please fill in all the fields", emptyFields})
    }


    try {
        const answersArray = answers.split(/\s*,\s*/)
        const optionsArray = options.split(/\s*,\s*/)

        const fullQuestion = await Question.create({
            question: question, 
            options:optionsArray, 
            answers:answersArray})
        response.status(200).json(fullQuestion)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

//delete a question
const deleteQuestion = async (request, response) => {
    const {id} = request.params

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Question not Found"})
    }

    const question = await Question.findOneAndDelete({_id:id})

    if(!question){
        return response.status(400).json({error: "Question not Found"})
    }

    response.status(200).json(question)
}

const updateQuestion = async(request, response) =>{
    const {id} = request.params

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Question not Found"})
    }

    const question = await Question.findOneAndUpdate({_id:id}, {...request.body})

    if(!question){
        return response.status(400).json({error: "Question not Found"})
    }

    response.status(200).json(question)
}

module.exports = {
    createQuestion, getAllQuestions, getQuestion, deleteQuestion, updateQuestion
}