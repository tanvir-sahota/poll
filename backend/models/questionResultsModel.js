const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionResultsSchema = new Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId, ref: "Question",
        required: true
    },
    questionResultsArray: {
        type: Array,
        of: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("QuestionResults", questionResultsSchema)