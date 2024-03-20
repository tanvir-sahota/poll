const QuizResult = require("../models/quizResultsModel")
const QuestionResult = require("../models/questionResultsModel")
const Classroom = require("../models/ClassroomModel")
const Question = require("../models/questionModel")
const mongoose = require("mongoose")


//Get a question result
const getQuestionResults = async (request, response) => {
    const {id} = request.params
    const {classID} = request.params

    if (!mongoose.isValidObjectId(id)) {
        return response.status(404).json({error: "QuestionResult doesn't Exist"})
    }

    const classroom = await Classroom.findById(classID)
    const quizResult = await QuizResult.findById(classroom.quizResults)
    const questionResult = quizResult.quizResultArray.get(id)

    if (!questionResult) {
        return response.status(404).json({error: "QuestionResult doesn't exist"})
    }

    response.status(200).json(questionResult)
}

//Post request to create question result
const createQuestionResults = async (request, response) => {
    const {currentAnswer} = request.body // an array of answers
    const {currentQuestion} = request.body // the question object this result belongs to
    const {quiz} = request.body


    try {

        const questionResult = await QuestionResult.create({
            question: currentQuestion,
            questionResultsArray: currentAnswer
        })
        const classroom = await Classroom.findById(quiz.classroom).exec()
        const quizResultArray = classroom.quizResultArray
        const latestQuizResult = quizResultArray[quizResultArray.length -1]

       await QuizResult.findByIdAndUpdate(latestQuizResult._id, { $push: {quizResultsArray: questionResult}})

        // const latestQuizResult = QuizResult.findOne().sort({ createdAt: -1 }).limit(1)
        // latestQuizResult.updateOne({$push: {quizResultsArray: questionResult}})


    } catch (error) {
        response.status(400).json({error: error.message})
    }
}

//delete a question
const deleteQuestionResults = async (request, response) => {
    const {id} = request.params

    if (!mongoose.isValidObjectId(id)) {
        return response.status(404).json({error: "QuestionResult not Found"})
    }

    const questionResult = await QuestionResult.findByIdAndDelete(id)

    if (!(questionResult)) {
        return response.status(400).json({error: "QuestionResult not Found"})
    }

    response.status(200).json(questionResult)
}


module.exports = {
    createQuestionResults, getQuestionResults, deleteQuestionResults
}