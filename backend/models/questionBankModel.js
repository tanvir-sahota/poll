const mongoose = require("mongoose")

const Schema = mongoose.Schema

const questionBankSchema = new Schema({
    questionArray: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref:"Question"}],
        required: true,
        default: undefined
    }
}, {timestamps: true})

module.exports = mongoose.model("QuestionBank", questionBankSchema)

