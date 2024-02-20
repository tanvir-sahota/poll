const ClassroomModel = require('../models/ClassroomModel');
const questionBankModel = require('../models/questionBankModel');

exports.getAllClassrooms = async (req, res) => {
    console.log("get classrooms")
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
        const { questions } = questionBankModel.create()
        const { owner, title } = req.body;
        const classroom = new ClassroomModel({ owner, title, questions });
        await classroom.save();
        res.json(classroom);
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
