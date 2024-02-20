const mongoose = require('mongoose')

const Schema = mongoose.Schema

// placeholder until Question is complete
const question = {}

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    num_questions: {
        type: Number,
        required: false,
    },
    questions: {
        type: [question],
        required: false,
    },
}, {timestamps: true})


// instantiation of this in other files can be
//  used to find info on all quizzes
module.exports = mongoose.model('quiz', quizSchema)

