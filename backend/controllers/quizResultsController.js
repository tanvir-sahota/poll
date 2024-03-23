const createQuizResults = async (req, res) => {
    const { quiz, questions, answers } = req.body;

    try {
        console.log(`Saved Quiz!\n${JSON.stringify(req.body)}`)
        res.status(201).send({quiz, questions, answers})
    } catch (err) {
        console.error(err.message);
        res.status(400).send( {error: err.message} );
    }

}

module.exports = { createQuizResults }