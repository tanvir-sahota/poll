const mongoose = require('mongoose')

const Schema = mongoose.Schema

// placeholder until Question is complete

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

        // doesn't allow this line ???
        // required: false,
    },
    classroom: {
        // classID
        type: String,

        required: false,
    },
}, {timestamps: true})


// instantiation of this in other files can be
//  used to find info on all quizzes
module.exports = mongoose.model('quiz', quizSchema)

