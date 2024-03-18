const User = require("../models/userModel");
const createQuestionResults = async (req, res) => {
    const { questions, answers } = req.body;

    try {
        console.log(`Saved Quiz!\n${JSON.stringify(req.body)}`)
        res.status(201).send({questions, answers})
    } catch (err) {
        console.error(err.message);
        res.status(400).send( {error: err.message} );
    }

}

module.exports = { createQuestionResults }