const mongoose = require('mongoose');

// create Schema

const VirtualClassroomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    teacher:{
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
});

module.exports = mongoose.model('VirtualClassroomModel',VirtualClassroomSchema);