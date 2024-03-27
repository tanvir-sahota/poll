//import all required components
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema for Question
//Contains the string of the question, the possible options if at all any,
//the answer(s) to the question and its type
const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: false
    },
    answers: {
        type: [String],
        required: true
    },
    questionType:{
        type: String,
        required: true
    }
}, {timestamps: true})

//exporting the question schema as a model 
module.exports = mongoose.model("Question", questionSchema)