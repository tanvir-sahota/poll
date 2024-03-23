const mongoose = require('mongoose');

// create Schema

const ClassroomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        required: true
    },
    questions:{
        type: mongoose.Schema.Types.ObjectId, ref:"QuestionBank",
        required : true
    },
    folders:[{
        type: mongoose.Schema.Types.ObjectId
    }]
    ,
    quizzes:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    quizResultArray:{
        type: Array,
        of: mongoose.Schema.Types.ObjectId, ref:"QuizResults",
        required : true
    }
}, { timestamps: true });

module.exports = mongoose.model('Classroom',ClassroomSchema);