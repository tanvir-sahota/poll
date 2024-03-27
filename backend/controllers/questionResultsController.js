const QuizResult = require("../models/quizResultsModel")
const QuestionResult = require("../models/questionResultsModel")
const Classroom = require("../models/ClassroomModel")
const mongoose = require("mongoose")


//Get all question results belonging to a quiz
const getQuestionResults = async (request, response) => {
    const {quizResultID} = request.params

    if (!mongoose.isValidObjectId(quizResultID)) {
        return response.status(404).json({error: "Quiz result containing question result doesn't Exist"})
    }

    const quizResult = await QuizResult.findById(quizResultID)
    const quiz_results_array = quizResult.quizResultsArray

    if (!quiz_results_array) {
        return response.status(404).json({error: "There are no question results available for this quiz result"})
    }

    const all_question_results = await QuestionResult.find({})
    const question_results = await all_question_results.filter(result => {
         return quiz_results_array.includes(result._id)
    })


    response.status(200).json(question_results)
}

const getQuestionResult = async (request, response) => {
    const {quizResultID} = request.params
    const {id} = request.params

    if (!mongoose.isValidObjectId(quizResultID)) {
        return response.status(404).json({error: "Quiz result containing question result doesn't Exist"})
    }

    const quizResult = await QuizResult.findById(quizResultID)
    const questionResults = quizResult.quizResultsArray

    const question_result = questionResults.find(result => {
        return result._id = id;
    })

    if (!question_result) {
        return response.status(404).json({error: "QuestionResult doesn't exist"})
    }

    response.status(200).json(question_result)
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
    createQuestionResults, getQuestionResults, deleteQuestionResults, getQuestionResult
}