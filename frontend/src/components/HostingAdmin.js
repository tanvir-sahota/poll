import {useQuestionContext} from "../hooks/useQuestionContext"
import {useQuizzesContext} from "../hooks/useQuizzesContext"
import {useEffect, useState} from "react"
import QuestionDisplay from "./QuestionDisplay"
import parse from 'html-react-parser'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useNavigate} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";

const HostingAdmin = (inputData) => {
    const {socket, currentQuestion, lecturer} = inputData
    const {questions} = useQuestionContext()
    const {quiz} = useQuizzesContext()
    const [position, setPosition] = useState(questions.findIndex(q => q._id === currentQuestion._id))
    const [answers, setAnswers] = useState(questions.map((q => q.options.length > 1 ? q.options.map(o => 0) : 0)))
    const [correctSubmissions, setCorrectSubmissions] = useState(0)
    
    const navigate = useNavigate()
    const [attendees, setAttendees] = useState(0)
    const [submission, setSubmission] = useState(0)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showWH, setWHShow] = useState(false)
    const handleWHClose = () => setWHShow(false)
    const handleWHShow = () => setWHShow(true)

    let regularExpression = [];
    
    const getChart = () => ({
        labels: questions[position].options,
        datasets: [{
            label: "Selections",
            data: questions[position].options.map(option => answers[position].at(questions[position].options.indexOf(option))),
            backgroundColor: questions[position].options.map(op => (questions[position].answers.includes(op)
            || questions[position].answers.includes(op.slice(2)) ? 'green' : 'red')),
        }],
    })
    const [chartData, setChart] = useState(getChart())
    useEffect(() => {setChart(getChart())}, [questions, answers, position])

    const getWHChart = () => ({
        labels: ["Correct", "Incorrect"],
        datasets: [{
            label: "Selections",
            data: [answers[position], ((submission - [answers[position]]))],
            backgroundColor: ['green', 'red'],
        }],
    })
    const [chartWHData, setWHChart] = useState(getWHChart())
    useEffect(() => {setWHChart(getWHChart())}, [questions, answers, position, submission, correctSubmissions])

    useEffect(() => {

        const attendeeChecker = () => {
            socket.emit("update-attendees", lecturer, (response) => {
                setAttendees(response.count)
            })
        }

        socket.on("new-attendees", attendeeChecker)
        return () => {
            socket.off("new-attendees", attendeeChecker)
        }
    }, [])


    useEffect(() => {
        let receiveTextHandler = null
        receiveTextHandler = answer => {
            const comparison = regularExpression.map(regex => {
                return regex == answer.toString().replaceAll(" ","").toLowerCase()})
            setAnswers(prevAnswers => {
                console.log(`Previous answers: ${prevAnswers[position]}`)
                const allAnswers = [...prevAnswers]
                let questionAnswers = prevAnswers[position]
                comparison.includes(true) ? questionAnswers += 1 : questionAnswers -=1
                allAnswers[position] = questionAnswers
                console.log(`${allAnswers[position]} ${questions[position].question}`)
                return allAnswers
            })
            socket.emit("get-number-of-submissions", lecturer, (response) => {
                setSubmission(response.count)
            })
        }
        socket.addEventListener("recieve-answer-text", receiveTextHandler)
        console.log("Added text event handler")
        return () => {
            if (receiveTextHandler) {
                socket.removeEventListener("recieve-answer-text", receiveTextHandler)
                console.log("Removed text event handler")
            }
        }
    }, [position])

    useEffect(() => {
        console.log("useEffect receiveMultipleChoice effect running")
        let receiveMultipleChoiceHandler = null
        receiveMultipleChoiceHandler = option => {
            const index = questions[position].options.findIndex(comparisonOption => comparisonOption === option)
            if (index === -1) {
                console.log("Empty answers")
            }
            setAnswers(prevAnswers => {
                console.log(`Previous answers: ${prevAnswers[position]}`)
                const allAnswers = [...prevAnswers]
                const questionAnswers = [...prevAnswers[position]]
                questionAnswers[index] += 1
                allAnswers[position] = questionAnswers
                console.log("Option added count", option)
                console.log(`${option} ${allAnswers[position]} ${questions[position].question}`)
                return allAnswers
            })
            socket.emit("get-number-of-submissions", lecturer, (response) => {
                setSubmission(response.count)
            })
        }
        socket.addEventListener("recieve-answer-mcq", receiveMultipleChoiceHandler)
        console.log("Added MCQ event handler")
        return () => {
            if (receiveMultipleChoiceHandler) {
                socket.removeEventListener("recieve-answer-mcq", receiveMultipleChoiceHandler)
                console.log("Removed MCQ event handler")
            }
        }
    }, [position])

    useEffect(() => {
        let declineMultipleChoiceHandler = null
        declineMultipleChoiceHandler = option => {
            const index = questions[position].options.findIndex(comparisonOption => comparisonOption === option)
            setAnswers(prevAnswers => {
                console.log(`Previous answers: ${prevAnswers[position]}`)
                const oldAnswers = prevAnswers[position]
                const allAnswers = [...prevAnswers]
                const questionAnswers = [...prevAnswers[position]]
                //questionAnswers.at(index) > 0 ? prevAnswers[position][index] -= 1 : prevAnswers[position][index] = 0
                questionAnswers.at(index) > 0 ? questionAnswers[index] -= 1 : questionAnswers[index] = 0
                /*if (questionAnswers.at(index) > 0) {
                    prevAnswers[position][index] -= 1
                } else {
                    prevAnswers[position][index] = 0
                }*/
                //allAnswers[position] = questionAnswers
                //allAnswers[position] = oldAnswers
                allAnswers[position] = questionAnswers
                console.log("Option minus count:", option)
                console.log(`${option} ${allAnswers[position]} ${questions[position].question}`)
                if (JSON.stringify(oldAnswers) === JSON.stringify(allAnswers[position]))
                {
                    //console.error("ERROR DID NOT DECREASE ANSWER")
                }
                if (!questions[position].options)
                {
                    console.error(`ERROR INVALID OPTIONS: ${questions[position].options}`)
                    console.log("Option minus count:", option)
                    console.log(`${option} ${allAnswers[position]} ${questions[position].question}`)
                }
                return allAnswers
            })
            socket.emit("get-number-of-submissions", lecturer, (response) => {
                setSubmission(response.count)
            })
        }
        socket.addEventListener("decline-answer-mcq", declineMultipleChoiceHandler)
        return () => {
            if (declineMultipleChoiceHandler) {
                socket.removeEventListener("decline-answer-mcq", declineMultipleChoiceHandler)
            }
        }
    }, [position])

    useEffect(() => {
        console.log("SET QUESTION")
        socket.emit("set-question", questions[position], lecturer)
        if(questions[position].questionType == "Wh-Question"){
            const answers = questions[position].answers
            const regexArray = answers.map(answer => {
                const temp = answer.toLowerCase().replaceAll(' ', '')
                return temp
            })
            regularExpression = regexArray;
        }
        shouldRenderPrevious(position)
        shouldRenderNext(position)
    }, [position])

    const handleNext =  () => {
        if (position < questions.length - 1) {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition + 1)

            shouldRenderPrevious(tempPosition + 1)
            shouldRenderNext(tempPosition + 1)

        }
    }

    const shouldRenderNext = async (newPos = 0) => {
        const nextButton = document.getElementById("nextButton");
        if (newPos === questions.length - 1) {
            nextButton.hidden = true
        } else {
            nextButton.hidden = false
        }

    }

    const handlePrev = async () => {

        if (position > 0) {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition - 1)

            shouldRenderPrevious(tempPosition -1)
            shouldRenderNext(tempPosition -1)
        }
        setSubmission(0)
    }

    const shouldRenderPrevious = async (newPos = 0) => {
        const prevButton = document.getElementById("prevButton");
        console.log(position)
        if (newPos === 0) {
            prevButton.hidden = true
        } else {
            prevButton.hidden = false
        }
    }


    const handleSaveQuiz = async () => {
        console.log("Handling save quiz")
        socket.emit("host-disconnect", lecturer)
        console.log("About to send fetch")

        const quizResults = {quiz, questions, answers}
        const response = await fetch(`${process.env.REACT_APP_URL}api/quiz-results/`, {
            method: "POST",
            body: JSON.stringify(quizResults),
            headers: {
                "Content-Type": "application/json",
            },
        });


        for (let index = 0; index < questions.length; index++) {
            const currentQuestion = questions.at(index)
            const currentAnswer = answers.at(index)
            console.log(currentQuestion)

            const questionAnswerBody = {currentQuestion, currentAnswer, quiz}
            const response =  fetch(`${process.env.REACT_APP_URL}api/question-results/`, {
                method: "POST",
                body: JSON.stringify(questionAnswerBody),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        console.log("Sent fetch")
        const json = await response.json();
        console.log("Got JSON")

        if (!response.ok) {
            console.log("Failed to save quiz results", json);
        }
        else {
            console.log("Saved quiz results")
        }
        navigate(-1)
    }

    const chartOptions = {scales: {
            x: {ticks: {font: {size : 25},},},
            y: {ticks: {stepSize: 1,},},},}


    return (
        <div className="hostingDisplay">
            <div className="row" id="rowQuestionDisplay">
                <div id="prevButtonContainer">
                    <button id="prevButton" onClick={handlePrev} onLoad={shouldRenderPrevious}>
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </div>
                <div id="questionDisplayContainer">
                    <QuestionDisplay givenQuestion={questions[position]} isAdmin={true} socket={socket} lecturer={lecturer}/>
                </div>
                <div id="nextButtonContainer">
                    <button id="nextButton" onClick={handleNext} onLoad={shouldRenderNext}>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Responses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Bar data={chartData} options={chartOptions} />
                </Modal.Body>
            </Modal>
            {questions[position].options.length > 0 ?
                <div className="questionDisplayContainer">
                    <Button id="responseButton" onClick={handleShow}>Student Responses</Button>
                </div>
                : null}

            <Modal show={showWH} onHide={handleWHClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Responses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Bar data={chartWHData} options={chartOptions}/>
                </Modal.Body>
            </Modal>

            {questions[position].options.length === 0 ?
                <div className="questionDisplayContainer">
                    <Button id="responseButton" onClick={handleWHShow}>Student Responses</Button>
                </div>
                : null}

            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-1" style={{textAlign:"right"}}>
                    <span id="hostingLabels"className="material-symbols-outlined">input</span>
                </div>
                <div className="col-sm-1" style={{textAlign:"left"}}>
                    <p id="hostingLabels">{submission}</p>
                </div>

                <div className="col-sm-4">
                    <button id="saveQuiz" onClick={handleSaveQuiz}>
                        Save Quiz
                    </button>
                </div>
                <div className="col-sm-1" style={{textAlign:"right"}}>
                    <span id="hostingLabels"className="material-symbols-outlined">group</span>
                </div>
                <div className="col-sm-1" style={{textAlign:"left"}}>
                    <p id="hostingLabels">{attendees}</p>
                </div>
                <div className="col-sm-2"></div>
            </div>



        </div>
    )
}
export default HostingAdmin