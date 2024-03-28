//import all required components
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for Quiz
//Contains a title, description, the number of questions it contains and
//references to the folder and classroom it belongs to and
//the questions it contains  

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    folder : {
        type: mongoose.Schema.Types.ObjectId,
        required : false,
    },
    num_questions: {
        type: Number,
        required: false,
    },
    questions: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Question"}],
    },
    classroom: {
        type: String,
        required: false,
    },
}, {timestamps: true})

//exporting the quiz schema as a model 
module.exports = mongoose.model('quiz', quizSchema)