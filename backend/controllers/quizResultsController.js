const createQuizResults = async (req, res) => {
    const { quiz, answers } = req.body;

    try {
        console.log(`Saved Quiz!\n${JSON.stringify(req.body)}`)
        res.status(201).send({quiz, answers})
    } catch (err) {
        console.error(err.message);
        res.status(400).send( {error: err.message} );
    }

}

module.exports = { createQuizResults }