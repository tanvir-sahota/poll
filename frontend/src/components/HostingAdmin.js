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
    const [answers, setAnswers] = useState(questions.map((q => q.options.length > 1 ? q.options.map(o => 0) : [])))
    const [correctSubmissions, setCorrectSubmissions] = useState(0)
    const [regularExpression, setRegex] = useState([])
    
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showWH, setWHShow] = useState(false)
    const handleWHClose = () => setWHShow(false)
    const handleWHShow = () => setWHShow(true)


    

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

      
    const navigate = useNavigate()
    const [attendees, setAttendees] = useState(0)
    const [submission, setSubmission] = useState(0)

    const getWHChart = () => ({
        labels: ["Correct", "Incorrect"],
        datasets: [{
            label: "Selections",
            data: [correctSubmissions, ((submission - correctSubmissions))],
            backgroundColor: ['green', 'red'],
        }],
    })
    const [chartWHData, setWHChart] = useState(getWHChart())
    useEffect(() => {setWHChart(getWHChart())}, [questions, answers, position, submission, correctSubmissions])

    useEffect(() => {

        const attendeeChecker = () => {
            console.log("Got message")
            socket.emit("update-attendees", lecturer, (response) => {
                console.log(response.count)
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
            console.log("received answer: " + answer)
            // setAnswers(prevAnswers => {
            //     const allAnswers = [...prevAnswers]
            //     allAnswers[position] = [...prevAnswers[position], answer]
            //     return allAnswers
            // })
            console.log("REGEX", regularExpression)
            const comparison = regularExpression.map(regex => {
                return regex == answer.toString().replaceAll(" ","").toLowerCase()})
            console.log(comparison)
            if(comparison.includes(true)){
                setCorrectSubmissions(prevValue => {return (prevValue + 1)})
            }
            console.log("NUMBER OF CORRECT SUBMISSIONS ", correctSubmissions)
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
            const index = questions[position].options.findIndex(comparisonOption => comparisonOption == option)
            setAnswers(prevAnswers => {
                const allAnswers = [...prevAnswers]
                const questionAnswers = [...prevAnswers[position]]
                questionAnswers.at(index) > 0 ? prevAnswers[position][index] -= 1 : prevAnswers[position][index] = 0
                allAnswers[position] = questionAnswers
                console.log("Option minus count", option)
                console.log(`${option} ${allAnswers[position]} ${questions[position].question}`)
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
            console.log(regexArray)
            setRegex(regexArray)
            console.log("NEW REGEX ", regularExpression)
        }
        shouldRenderPrevious(position)
        shouldRenderNext(position)
    }, [position])

    const handleNext =  () => {
        // if (position >= questions.length - 1) {
        //     setPosition(0)
        // } else {
        //     const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
        //     setPosition(tempPosition + 1)
        // }

        if (position < questions.length - 1) {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition + 1)

            shouldRenderPrevious(tempPosition + 1)
            shouldRenderNext(tempPosition + 1)

        }
    }

    const shouldRenderNext = async (newPos = 0) => {
       // const nextButton = document.getElementById("nextButton");
        const nextButton = document.getElementById("nextButton");
        if (newPos === questions.length - 1) {
            nextButton.hidden = true
        } else {
            nextButton.hidden = false
        }

    }


    const handlePrev = async () => {
        // if (position <= 0) {
        //     setPosition(questions.length - 1)
        // } else {
        //     const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
        //     setPosition(tempPosition - 1)
        // }

        if (position > 0) {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition - 1)

            shouldRenderPrevious(tempPosition -1)
            shouldRenderNext(tempPosition -1)
        }
        setSubmission(0)
    }

    const shouldRenderPrevious = async (newPos = 0) => {
       // const nextButton = document.getElementById("nextButton");
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
      // navigate(`/api/quizzes/${quiz._id}/${quiz.classroom}`)
        navigate(-1)
    }

    const chartOptions = {scales: {
        x: {ticks: {font: {size : 25},},},
        y: {ticks: {stepSize: 1,},},},}
      

    return (
        <div className="hostingDisplay">
            <div class="row" id="rowQuestionDisplay">
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
            <Button id="graphButton" onClick={handleShow}>Student Responses</Button>
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
            <Button id="graphButton" onClick={handleWHShow}>Student Responses</Button>
            : null}
            
            <div className="saveQuizButton">
                <button id="saveQuiz" onClick={handleSaveQuiz}>
                    Save Quiz
                </button>
            </div>
            <div className="attendeeNumber">
                <p>Number of attendees: {attendees}</p>
            </div>
            <div className="submissionNumber">
                <p>Number of submissions: {submission}</p>
            </div>


        </div>
    )
}
export default HostingAdmin