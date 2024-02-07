const mongoose = require("mongoose")

const Schema = mongoose.Schema

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answers: {
        type: [String],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Question", questionSchema)

