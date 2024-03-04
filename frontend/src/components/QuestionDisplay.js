import { useState } from "react"

const QuestionDisplay = (inputData) => {
    const {givenQuestion, isAdmin, socket} = inputData
    const {question, options, answers} = givenQuestion
    // console.log(givenQuestion)
    // console.log("Question: ", question)
    // console.log("Options: ", options)
    // console.log("Answers: ", answers)

    const [isMCQ, setMCQ] = useState(options.length > 1 ? true : false)
    const [showAnswer, setShowAnswer] = useState(false)

    const handleSubmission = () => {
        setShowAnswer(!showAnswer)
    }

    socket.on("display-question", question => {
        setMCQ(question.options.length > 1 ? true : false)
        console.log(socket.id + " has re-rendered")
    })


    return(
        <div className = "display">
            <h1 id="displayedQuestion">{question}</h1>

            {isMCQ ? 
                options.map(option => (
                    <button key={option} className="option">{option}</button>
                ))
            : 
                <div>
                    <label for="answerArea">Input Answer:</label>
                    <textarea id="answerSubmission" name="answerArea" rows="1" cols="50"></textarea>
                </div>
            }

            {isAdmin ? 
                <div>
                    {showAnswer ?
                    <div>
                        <h3><strong>{answers}</strong></h3>
                        <button id="showAnswer" onClick={handleSubmission}>Hide Answer</button>
                    </div>
                    : 
                        <button id="showAnswer" onClick={handleSubmission}>Show Answer</button>
                    }
                </div>
            : null}

        </div>
    ) 
}

export default QuestionDisplay