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
    const [answers, setAnswers] = useState(question.options.map(o => 0))

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

    /*useEffect(() => {
        socket.on("initialise-option", function(option) {
            //setOptions(previousOptions => [...previousOptions, option])
            //setAnswers(answers => [...answers, 0])
            //console.log("Init option",option)
        })
        //return () => socket.close()
    }, [])*/

    useEffect(() => {
        socket.on("recieve-answer-mcq", function(option) {
            const index = question.options.findIndex(comparisonOption => comparisonOption === option)
            let list = answers
            list[index] += 1
            setAnswers(list)
            console.log("Option added count",option)
        })
        //return () => socket.close()
    }, [])

    useEffect(() => {
        socket.on("decline-answer-mcq", function(option) {
            const index = question.options.findIndex(comparisonOption => comparisonOption == option)
            let list = answers
            list.at(index) > 0 ? list[index] -= 1 : list[index] = 0
            setAnswers(list)
            console.log("Option minus count",option)
        })
        //return () => socket.close()
    }, [])

    useEffect(() => {
        socket.emit("set-question", question, userName)
    }, [position])


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
        //setOptions([])
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
        //setOptions([])
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
            <div className="options">
                {question.options ?
                    question.options.map(option => (
                        <dl>
                            <dt>{option}</dt>
                            <dd>{answers.at(question.options.indexOf(option))}</dd>
                            {console.log(`${option}: ${answers.at(question.options.indexOf(option))}`)}
                            {console.log(`ANSWERS: ${answers}`)}
                        </dl>
                    ))
                :
                    answers && answers.map(answer => (<p>{answer}</p>))
                }
            </div>
        </div>
    )
    
    }
    export default HostingAdmin