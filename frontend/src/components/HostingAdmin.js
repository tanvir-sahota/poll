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
    const [answers, setAnswers] = useState(question.options.length > 1 ? question.options.map(o => 0) : [])

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/${classID}`)
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
            //setAnswers(previousAnswers => [...previousAnswers, answer])
            //etAnswers(previousAnswers => [...previousAnswers, answer])
            setAnswers(prevAnswers => {
                let list = [...prevAnswers]
                list = [...list, answer]
                console.log("NEW TEXT ANSWER ",answer)
                console.log(`${list}`)
                return list
            })
            //console.log(answers)
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
            //let list = answers
            //list[index] += 1
            /*this.setState(prevAnswers => ({
                let list = prevAnswers
                list[index] += 1
                return list
            })*/
            /*let list = [...answers]
            list[index] += 1
            console.log("Option added count",option)
            console.log(`${option} ${list}`)
            setAnswers(list)*/
            //return prevAnswers
            setAnswers(prevAnswers => {
                let list = [...prevAnswers]
                list[index] += 1
                console.log("Option added count",option)
                console.log(`${option} ${list}`)
                return list
            })
            //console.log("Option added count",option)
            //console.log(`${option} ${list}`)
        })
        //return () => socket.close()
    }, [])

    useEffect(() => {
        socket.on("decline-answer-mcq", function(option) {
            const index = question.options.findIndex(comparisonOption => comparisonOption == option)
            /*let list = answers
            list.at(index) > 0 ? list[index] -= 1 : list[index] = 0
            setAnswers(list)
            console.log("Option minus count",option)*/

            setAnswers(prevAnswers => {
                let list = [...prevAnswers]
                list.at(index) > 0 ? list[index] -= 1 : list[index] = 0
                console.log("Option minus count",option)
                console.log(`${option} ${list}`)
                return list
            })
        })
        //return () => socket.close()
    }, [])

    useEffect(() => {
        socket.emit("set-question", question, userName)
    }, [position])


    const handleNext = async () => {
        let newQuestion;
        if(position >= questions.length - 1){
            newQuestion = questions.at(0)
            setPosition(0)
        }
        else{
            const tempPosition = questions.findIndex((x) => x._id === question._id)
            newQuestion = questions.at(tempPosition + 1)
            setPosition(tempPosition + 1)
        }
        setQuestion(newQuestion)
        if (newQuestion.options.length > 1) {
            setAnswers(newQuestion.options.map(o => 0))
        }
        else {
            setAnswers([])
        }

        //setOptions([])
    }
    const handlePrev = async () => {
        let newQuestion;
        if(position <= 0){
            newQuestion = questions.at(-1)
            setPosition(questions.length - 1)
        }
        else{
            const tempPosition = questions.findIndex((x) => x._id === question._id)
            newQuestion = questions.at(tempPosition - 1)
            setPosition(tempPosition - 1)
        }
        setQuestion(newQuestion)
        if (newQuestion.options.length > 1) {
            setAnswers(newQuestion.options.map(o => 0))
        }
        else {
            setAnswers([])
        }
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
                {question.options.length > 1 ?
                    question.options.map(option => {
                        const count = answers.at(question.options.indexOf(option))
                        console.log(`${option}: ${count}`)
                        console.log(`ANSWERS: ${answers}`)

                        return <dl>
                            <dt>{option}</dt>
                            <dd>{count}</dd>
                        </dl>
                    })
                    :
                    answers && answers.map(answer => (<p>{answer}</p>))
                }
            </div>
        </div>
    )

}
export default HostingAdmin