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

    socket.emit("set-question", question, userName)

    socket.on("recieve-answer-text", answer => {
        let list = answers
        list.push(answer)
        setAnswers(list)
        console.log(answers)
    })

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
    }

    return(
        <div>
            <QuestionDisplay givenQuestion = {question} isAdmin={true} socket={socket}/>
            <button onClick={handleNext}>
                NEXT QUESTION
            </button>
            <button onClick={handlePrev}>
                PREVIOUS QUESTION
            </button>
            <div>{answers && answers.map(answer => (
                <p>{answer}</p>
            ))}</div>
        </div>
    )
    
    }
    export default HostingAdmin