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

    response.status(200).json(question)
}

//Post request to create workout
const createQuestion = async (request, response) => {
    const {questionAsked, options, answers} = request.body

    let emptyFields = []

    if(!questionAsked){
        emptyFields.push("questionAsked")
    }
    if(!answers){
        emptyFields.push("answers")
    }
    if(emptyFields.length > 0){
        return response.status(400).json({ error: "Please fill in all the fields", emptyFields})
    }


    try {
        const answersArray = answers.split(/\s*,\s*/)

        if(options.length != 0){
            const optionsArray = options.split(/\s*,\s*/)
            const checkOptionsIncludeAnswer = answersArray.filter(x => {
                return optionsArray.includes(x)
            })
            if(checkOptionsIncludeAnswer.length != answersArray.length){
                return response.status(422).json({error: "All answers must be included in options", emptyFields})
            }
            else{
                const fullQuestion = await Question.create({
                    question: questionAsked, 
                    options:optionsArray, 
                    answers:answersArray})
                response.status(200).json(fullQuestion)
            }
        }
        else{
            const fullQuestion = await Question.create({
                question: questionAsked, 
                answers:answersArray})
            response.status(200).json(fullQuestion)
        }
        

        

        
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
    const {questionAsked, options, answers} = request.body
    const answersArray = answers.split(/\s*,\s*/)
    const optionsArray = options.split(/\s*,\s*/)

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Invalid Object"})
    }

    if(options.length != 0)
    {
        const checkOptionsIncludeAnswer = answersArray.filter(x => {
        return optionsArray.includes(x)
        })

        if(checkOptionsIncludeAnswer.length != answersArray.length){
            return response.status(422).json({error: "All answers must be included in options"})
        }
    }

    const question = await Question.findByIdAndUpdate(id, {question:questionAsked, options:optionsArray, answers:answersArray })

    if(!question){
        return response.status(400).json({error: "Question not Found"})
    }

    const newQuestion = await Question.findById(id)
    response.status(200).json(newQuestion)
}

module.exports = {
    createQuestion, getAllQuestions, getQuestion, deleteQuestion, updateQuestion
}