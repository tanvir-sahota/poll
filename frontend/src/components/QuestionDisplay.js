import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MCQButton from "./MCQButton"

const QuestionDisplay = (inputData) => {
    const {givenQuestion, isAdmin, socket, lecturer} = inputData
    const {question, options, answers} = givenQuestion
    const navigate = useNavigate()
    // console.log(givenQuestion)
    // console.log("Question: ", question)
    // console.log("Options: ", options)
    // console.log("Answers: ", answers)

    const [isMCQ, setMCQ] = useState(options.length > 1 ? true : false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [textAnswer, setTextAnswer] = useState(null)

    const handleSubmission = () => {
        setShowAnswer(!showAnswer)
    }

    const handleDisconnect = () => {
        socket.emit("host-disconnect", lecturer) 
        navigate("/dashboard")
    }

    const submitAnswer = () => {
        socket.emit("submit-answer-text", lecturer, textAnswer)
        console.log("Submitted " + textAnswer)
    }

    socket.on("display-question", question => {
        setMCQ(question.options.length > 1 ? true : false)
        if (isMCQ) {
            console.log("Loaded buttons")
        }
    })


    return (
        <div className="display">
            <h1 id="displayedQuestion">{question}</h1>

            {isMCQ && (!isAdmin) ?
                options.map(option => (
                    <MCQButton option={option} socket={socket} lecturer={lecturer}/>
                ))
                :
                <div className="answerInput">
                    {/* <textarea id="answerSubmission" name="answerArea" rows="1" cols="50"></textarea> */}
                    {!isAdmin ?
                        <div>
                            <label htmlFor="answerArea">Input Answer:</label>
                            <form onSubmit={submitAnswer}>
                                <input name="answerArea" type="text" onChange={(e) => setTextAnswer(e.target.value)}/>
                                <input type="submit"/>
                            </form>
                        </div>
                        :
                        null}
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
                    <button id="disconnectButton" onClick={handleDisconnect}>Disconnect</button>
                </div>
                : null}

        </div>
    )
}

export default QuestionDisplay