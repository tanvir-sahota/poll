const mongoose = require('mongoose');

// create Schema

const ClassroomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    owner:{
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // required: true
    },
    students:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    quizzes:[{
        type: mongoose.Schema.Types.ObjectId
    }]
}, { timestamps: true });

module.exports = mongoose.model('Classroom',ClassroomSchema);