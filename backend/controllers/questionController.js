const QuestionBank = require("../models/questionBankModel")
const Question = require("../models/questionModel")
const Classroom = require("../models/ClassroomModel")
const mongoose = require("mongoose")

//Get all questions
const getAllQuestions = async (request, response) => {
    const {classID} = request.params
    try {
        const classroom = await Classroom.findById(classID)
        const questionBank = await QuestionBank.findById(classroom.questions)
        const questionIDs = questionBank.questionArray
        const questions = await Question.find({_id: {$in : questionIDs}}).sort({createdAt : -1})
        response.status(200).json(questions)
    } catch (error) {
        console.log("Error")
        return response.status(404).json({error: "QuestionBank doesn't exist"})
    }
}

//Get a question
const getQuestion = async (request, response) => {
    const {id} = request.params
    const {classID} = request.params

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Question doesn't Exist"})
    }

    const classroom = await Classroom.findById(classID)
    const questionBank = await QuestionBank.findById(classroom.questions)
    const index = (questionBank.questionArray).indexOf(id)
    const question = questionBank.questionArray[index]

    if(!question){
        return response.status(404).json({error: "Question doesn't exist"})
    }

    response.status(200).json(question)
}

//Post request to create question
const createQuestion = async (request, response) => {
    const {questionAsked, options, answers} = request.body
    const {classID} = request.params
    
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
                    answers:answersArray,
                    questionType:"MCQ"})

                const classroom = await Classroom.findById(classID)
                const questionBank = await QuestionBank.findById(classroom.questions)
                const questions = questionBank.questionArray.push(fullQuestion)
                questionBank.markModified("questionArray")
                questionBank.save()
                
                response.status(200).json(fullQuestion)
            }
        }
        else{
            const fullQuestion = await Question.create({
                question: questionAsked, 
                answers:answersArray,
                questionType:"Wh-Question"})

                const classroom = await Classroom.findById(classID)
                const questionBank = await QuestionBank.findById(classroom.questions)
                const questions = questionBank.questionArray.push(fullQuestion)
                questionBank.markModified("questionArray")
                questionBank.save()
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

    const question = await Question.findByIdAndDelete(id)

    if(!(question)){
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

    const questionType = (options.length != 0) ? "MCQ" : "Wh-Question"
    const newQuestion = await Question.findByIdAndUpdate(id, {question:questionAsked, options:optionsArray, answers:answersArray, questionType:questionType })

    if(!newQuestion){
        return response.status(400).json({error: "Question not Found"})
    }
    const questionContext = await Question.findById(id)
    
    response.status(200).json(questionContext)
}

module.exports = {
    createQuestion, getAllQuestions, getQuestion, deleteQuestion, updateQuestion
}