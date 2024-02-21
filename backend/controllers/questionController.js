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
        const questions = await Question.find({_id: {$in : questionIDs}})
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

    // const question = await Question.findById(id)
    //const question = await ClassroomModel.findById(classID).select("questions").select("questionArray").findById(id)

    const classroom = await Classroom.findById(classID)
    const questionBank = await QuestionBank.findById(classroom.questions)
    const index = (questionBank.questionArray).indexOf(id)
    const question = questionBank.questionArray[index]

    if(!question){
        return response.status(404).json({error: "Question doesn't exist"})
    }

    response.status(200).json(question)
}

//Post request to create workout
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
            const questionBank = await ClassroomModel.findById(classID).select("questions").select("questionArray").push(fullQuestion)
            questionBank.save(done)
            response.status(200).json(fullQuestion)
        }
        

        

        
    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

//delete a question
const deleteQuestion = async (request, response) => {
    const {id} = request.params
    const {classID} = request.params

    if(!mongoose.isValidObjectId(id)){
        return response.status(404).json({error: "Question not Found"})
    }

    const classroom = await Classroom.findById(classID)
    const questionBank = await QuestionBank.findById(classroom.questions)
    const index = (questionBank.questionArray).indexOf(id)
    const qGoneInArr = questionBank.questionArray.splice(index, 1)
    const qGone = await Question.findById(id).deleteOne()
    questionBank.markModified("questionArray")
    questionBank.save()

    if(!(questionBank.questionArray[index])){
        return response.status(400).json({error: "Question not Found"})
    }

    response.status(200).json(questionBank.questionArray[index])
}

const updateQuestion = async(request, response) =>{
    const {id} = request.params
    const {classID} = request.params
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

    const questionType = (options.length != 0) ? "Wh-Question" : "MCQ"
    //const question = await ClassroomModel.findById(classID).select("questions").select("questionArray").findByIdAndUpdate(id, {question:questionAsked, options:optionsArray, answers:answersArray, questionType:questionType })
    // const question = await Question.findByIdAndUpdate(id, {question:questionAsked, options:optionsArray, answers:answersArray, questionType:questionType })

    const classroom = await Classroom.findById(classID)
    const questionBank = await QuestionBank.findById(classroom.questions)
    const index = (questionBank.questionArray).indexOf(id)
    let questionCheck
    if(questionType == "MCQ"){
        const newQuestion = await Question.create({
            question: questionAsked, 
            options:optionsArray, 
            answers:answersArray,
            questionType:"MCQ"})
        questionCheck = newQuestion
        const qGoneInArr = questionBank.questionArray.splice(index, 1, newQuestion)
        const qGone = await Question.findById(id).deleteOne()
        questionBank.markModified("questionArray")
        questionBank.save()
    }
    else{
        const newQuestion = await Question.create({
            question: questionAsked, 
            answers:answersArray,
            questionType:"Wh-Question"})
            questionCheck = newQuestion
        const qGoneInArr = questionBank.questionArray.splice(index, 1, newQuestion)
        const qGone = await Question.findById(id).deleteOne()
        questionBank.markModified("questionArray")
        questionBank.save()
    }

    if(!questionCheck){
        return response.status(400).json({error: "Question not Found"})
    }
    response.status(200).json(questionCheck)
}

module.exports = {
    createQuestion, getAllQuestions, getQuestion, deleteQuestion, updateQuestion
}