const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionResultsSchema = new Schema({
    questionResultsMap: {
        type: Map,
        of: Number,
        required: true
      }
}, {timestamps: true}) 

module.exports = mongoose.model("QuestionResults", questionResultsSchema)