//import all required components
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema for Question Bank
//Contains an array with references to all the questions it stores
const questionBankSchema = new Schema({
    questionArray: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Question"}],
        required: false
    }
}, {timestamps: true})

//exporting the question bank schema as a model 
module.exports = mongoose.model("QuestionBank", questionBankSchema)

