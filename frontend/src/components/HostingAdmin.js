import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"
import QuestionDisplay from "./QuestionDisplay"

const HostingAdmin = (inputData) => {
    const {socket, newClassID, currentQuestion, userName} = inputData
    const classID = newClassID
    const [question, setQuestion] = useState(currentQuestion)
    const {questions, dispatch} = useQuestionContext()
    const [position, setPosition] = useState(0)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:4000/api/questions/${classID}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
        }
        fetchQuestions()
    }, [])

    useEffect(() => {
        socket.on("recieve-answer-text", function(answer) {
            //let list = answers
            //list.push(answer)
            //setAnswers(list)
            setAnswers(previousAnswers => [...previousAnswers, answer])
            console.log(answers)
        })
        //return () => socket.close()
    }, [])

    socket.emit("set-question", question, userName)

    const handleNext = async () => {
        const tempPosition = questions.findIndex((x) => x._id === question._id)
        if(position >= questions.length - 1){
            setQuestion(questions.at(0))
            setPosition(0)     
        }
        else{
            setQuestion(questions.at(tempPosition + 1))
            setPosition(tempPosition + 1)             
        }
        setAnswers([])
    }
    const handlePrev = async () => {
        const tempPosition = questions.findIndex((x) => x._id === question._id)
        if(position <= 0){
            setQuestion(questions.at(-1))
            setPosition(questions.length - 1)     
        }
        else{
            setQuestion(questions.at(tempPosition - 1))
            setPosition(tempPosition - 1)             
        }
        setAnswers([])
    }

    return(
        <div className="hostingDisplay">
            <div className="questionDisplay">
                <QuestionDisplay givenQuestion = {question} isAdmin = {true} socket = {socket}/>
            </div>
            <div className="nextButton">
                <button onClick={handleNext}>
                    NEXT QUESTION
                </button>
            </div>
            <div className="prevButton">
                <button onClick={handlePrev}>
                    PREVIOUS QUESTION
                </button>
            </div>
            <div>
                {answers && answers.map(answer => (<p>{answer}</p>))}
            </div>
        </div>
    )
    
    }
    export default HostingAdmin