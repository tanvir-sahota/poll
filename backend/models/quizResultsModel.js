const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quizResultsSchema = new Schema({
    quizResultsMap: {
        type: Map,
        of: [{type: mongoose.Schema.Types.ObjectId, ref:"QuestionResults"}],
        required: true
      }
}, {timestamps: true}) 

module.exports = mongoose.model("QuizResults", quizResultsSchema)