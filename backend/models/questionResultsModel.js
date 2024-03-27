//import all required components
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for Question Results
//Contains a reference to the question it holds the result for
//and an array of all submitted answers 
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

//exporting the question results schema as a model 
module.exports = mongoose.model("QuestionResults", questionResultsSchema)