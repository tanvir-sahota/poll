import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { Map } from  "immutable"
import MCQButton from "./MCQButton"
import parse from 'html-react-parser'
import Modal from 'react-bootstrap/Modal'

const QuestionDisplay = (inputData) => {
    const {givenQuestion, isAdmin, socket, lecturer} = inputData
    const {question, options, answers, questionType} = givenQuestion
<<<<<<< HEAD
=======
    const navigate = useNavigate()
    
>>>>>>> 3.1_host_classrooms
    // console.log(givenQuestion)
    // console.log("Question: ", question)
    // console.log("Options: ", options)
    // console.log("Answers: ", answers)

    const [isMCQ, setMCQ] = useState(options.length > 1)
    const [hasCode, setCode] = useState(questionType === 'CodeMCQ')
    const [showAnswer, setShowAnswer] = useState(false)

    const [clientSideInput, setInput] = useState("")
    const [hasSubmitted, setSubmitted] = useState(false)
    const [textAnswer, setTextAnswer] = useState(null)

    const [showInput, setShowInput] = useState(false)
    const handleCloseInput = () => setShowInput(false)
    const handleShowInput = () => setShowInput(true)

    let initialSelectedMCQ
    if (isMCQ) {
        const map = new Map()
        const optionPressed = options.map(o => false)
        initialSelectedMCQ = map.set(givenQuestion._id, optionPressed)
    } else {
        initialSelectedMCQ = new Map()
    }

    const [selectedMCQ, setSelectedMCQ] = useState(initialSelectedMCQ)

    const handleSubmission = () => {
        setShowAnswer(!showAnswer)
    }

    const handleDisconnect = () => {
        socket.emit("host-disconnect", lecturer) 
<<<<<<< HEAD
        window.location.href = "/dashboard"
=======
        //navigate("/dashboard")
        navigate(-1)
>>>>>>> 3.1_host_classrooms
    }

    const submitAnswer = async e => {
        e.preventDefault()
        socket.emit("submit-answer-text", lecturer, textAnswer)
        console.log("Submitted " + textAnswer)
        setInput(textAnswer)
        setTextAnswer("")
        setSubmitted(true)
        document.getElementById("answerBox").disabled = true
    }

    useEffect(() => {
        let displayQuestionHandler = null
        displayQuestionHandler = newQuestion => {
            setMCQ(newQuestion.options.length > 1)
            setCode(newQuestion.questionType === 'CodeMCQ')
            if (isMCQ) {
                console.log("Loaded buttons")
                setSelectedMCQ(prevMCQ => {
                    //const newMCQ = prevMCQ.set(question._id, "test")
                    if(!prevMCQ.has(newQuestion._id)) {
                        const optionPressed = newQuestion.options.map(o => false)
                        const newMCQ = prevMCQ.set(newQuestion._id, optionPressed)
                        console.log(newMCQ)
                        return newMCQ
                    }
                    return prevMCQ
                    /*else {
                    const optionPressed = options.map(o => false)
                    const newMCQ = prevMCQ.set(givenQuestion._id, optionPressed)
                    console.log(newMCQ)
                    return newMCQ
                }*/
                    /*const allAnswers = [...prevAnswers]
                    allAnswers[position] = [...prevAnswers[position], answer]*/
                    //return allAnswers
                })
            }
        }
        socket.addEventListener("display-question", displayQuestionHandler)
        console.log("Added display question event handler")
        return () => {
            if (displayQuestionHandler) {
                socket.removeEventListener("display-question", displayQuestionHandler)
                console.log("Removed display question event handler")
            }
        }

    }, [])

    const submitMCQAnswer = (option, position) => {
        socket.emit("submit-answer-MCQ", lecturer , option)
        setSelectedMCQ(prevMCQ => {
            const newOptionPressed = prevMCQ.get(givenQuestion._id)
            if(!newOptionPressed)
            {
                console.log("newOptionPressed UNDEFINED")
            }
            newOptionPressed[position] = true
            const newMCQ = prevMCQ.set(givenQuestion._id, [...newOptionPressed])
            console.log(newMCQ)
            return newMCQ
        })
        console.log("Option is ", option)
    }

    const unSubmitMCQ = (option, position) => {
        socket.emit("unsubmit-answer-MCQ", lecturer , option)
        //setPressed(false)
        setSelectedMCQ(prevMCQ => {
            const newOptionPressed = prevMCQ.get(givenQuestion._id)
            newOptionPressed[position] = false
            const newMCQ = prevMCQ.set(givenQuestion._id, [...newOptionPressed])
            console.log(newMCQ)
            return newMCQ
        })
        console.log("Option is ", option)
    }

    const handleMCQ = (option, position) => {
        let pressed = false
        if (selectedMCQ.has(givenQuestion._id)) {
            pressed = selectedMCQ.get(givenQuestion._id)[position]
        }
        !pressed ? submitMCQAnswer(option, position) : unSubmitMCQ(option, position)
    }


    return (
        <div className="questionContainer">
            <h1 id="displayedQuestion">{question}</h1>
            <div className="options">
                {isMCQ && (!isAdmin) ?
                    options.map((option, i) => {
                        let pressed = false
                        if (!selectedMCQ)
                        {
                            console.log("selectedMCQ UNDEFINED")
                        }
                        if (selectedMCQ.has(givenQuestion._id)) {
                            pressed = selectedMCQ.get(givenQuestion._id)[i]
                        }
                        //const pressed = selectedMCQ.get(question._id)[i]
                        return <MCQButton option={option} position={i} socket={socket} lecturer={lecturer} pressed={pressed} handleMCQ={handleMCQ}/>
                    })
                    
                    :
                    <div className="answerInput">
                        {/* <textarea id="answerSubmission" name="answerArea" rows="1" cols="50"></textarea> */}
                        {!isAdmin ?
                            <div className="row">
                                <div className="col">
                                    <div className="answerOptions">
                                        <form onSubmit={submitAnswer}>
                                            <input id="answerBox" name="answerArea" type="text" value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} disabled={hasSubmitted}/>
                                            <br/>
                                            {!hasSubmitted ?
                                                <button id="answerSubmit" type="submit">Submit</button>
                                            :
                                            null}
                                        </form>
                                        {hasSubmitted ?
                                        <div>
                                            <button id="answerSubmit" onClick={handleShowInput}>Show</button>
                                            <Modal show={showInput} onHide={handleCloseInput}>
                                                <Modal.Body>
                                                    <h3>Your Answer</h3>
                                                    <div className="closeIcon">
                                                        <span className="material-symbols-outlined" onClick={handleCloseInput}>Close</span>
                                                    </div>
                                                    <div className="card">
                                                        <p id = "studentAnswer">{clientSideInput}</p>
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        </div>
                                        : null}
                                    </div>
                                </div>
                            </div>
                            :
                            null}
                    </div>
                }
            </div>

            {isAdmin ?
                <div id="questionDisplayButtons">
                    {showAnswer ? (
                        <div>
                            <button className="showAnswer" onClick={handleSubmission}>Show Options</button>
                            <button id="disconnectButton" onClick={handleDisconnect}>Disconnect</button>
                        </div>
                    ) : (
                        <div>
                            <button className="showAnswer" onClick={handleSubmission}>Show Answers</button>
                            <button id="disconnectButton" onClick={handleDisconnect}>Disconnect</button>
                        </div>
                    )}
                    <div className="card" id="answerBox">
                        {showAnswer ? (
                            <div id="answers">
                                {answers.map((answer) => (
                                    <button className="answer">{parse(answer)}</button>
                                ))}
                            </div>
                        ) : (
                            <div id="options">
                                {options.map((option) => (
                                    <button className="answer">{parse(option)}</button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            : null}

        </div>
    )
}

export default QuestionDisplay