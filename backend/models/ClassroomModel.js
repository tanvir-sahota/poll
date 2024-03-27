//import all required components
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for Classrooms
//Contains a title and references to its Question Bank,
//the user who created it, the folders and quizzes it contains and
//an array of saved quiz results
const ClassroomSchema = new Schema({
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

//exporting the classroom schema as a model 
module.exports = mongoose.model('Classroom',ClassroomSchema);