const ClassroomModel = require('../models/ClassroomModel');
const QuestionBank = require('../models/questionBankModel');
const jwt = require('jsonwebtoken');


exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await ClassroomModel.find();
        res.json(classrooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getClassroomById = async (req, res) => {
    try {
        const classroom = await ClassroomModel.findById(req.params.id);
        if (!classroom) {
            return res.status(404).json({ msg: 'Virtual classroom not found' });
        }
        res.json(classroom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createClassroom = async (req, res) => {
    try {
        const questions  = new QuestionBank({questionArray:[]})
        await questions.save()
        const { owner, title } = req.body;
        const token = JSON.parse(owner).token
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                console.error('Invalid token')
                res.status(401).json({ error: 'Invalid token' })
            } else {
                const userId = decoded._id

                try {
                    const classroom = new ClassroomModel({ owner:userId, title:title, questions:questions });
                    await classroom.save();
                    res.json(classroom);
                } catch (error) {
                    console.error('Error creating classroom')
                    res.status(500).json({ error: 'Internal server error' });
                }
            }
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteClassroom = async (req, res) => {
    console.log("Delete class")
    try {
        console.log("ID: " + req.params.id)
        const classroom = await ClassroomModel.findById(req.params.id);
        console.log("Classroom: " + classroom)
        if (!classroom) {
            return res.status(404).json({ msg: 'Virtual classroom not found' });
        }
        await classroom.deleteOne();
        res.json({ msg: 'Virtual classroom removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
