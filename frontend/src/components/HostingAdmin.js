import {useQuestionContext} from "../hooks/useQuestionContext"
import {useEffect} from "react"
import {useState} from "react"
import QuestionDisplay from "./QuestionDisplay"
import parse from 'html-react-parser'

const HostingAdmin = (inputData) => {
    const {socket, currentQuestion, lecturer} = inputData
    const {questions} = useQuestionContext()
    const [position, setPosition] = useState(questions.findIndex(q => q._id === currentQuestion._id))
    const [answers, setAnswers] = useState(questions[position].options.length > 1 ? questions[position].options.map(o => 0) : [])

    useEffect(() => {
        let receiveTextHandler = null
        receiveTextHandler = answer => {
            setAnswers(prevAnswers => {
                let list = [...prevAnswers]
                list = [...list, answer]
                //console.log("NEW TEXT ANSWER ",answer)
                //console.log(`${list} ${questions[position].question}`)
                return list
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
        let receiveMultipleChoiceHandler = null
        receiveMultipleChoiceHandler = option => {
            const index = questions[position].options.findIndex(comparisonOption => comparisonOption === option)
            if (index === -1) {
                console.log("Empty answers")
            }
            setAnswers(prevAnswers => {
                let list = [...prevAnswers]
                list[index] += 1
                console.log("Option added count", option)
                console.log(`${option} ${list} ${questions[position].question}`)
                return list
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
                let list = [...prevAnswers]
                list.at(index) > 0 ? list[index] -= 1 : list[index] = 0
                console.log("Option minus count", option)
                console.log(`${option} ${list} ${questions[position].question}`)
                return list
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
        socket.emit("set-question", questions[position], lecturer)
    }, [position])

    const handleNext = async () => {
        let newQuestion;
        if (position >= questions.length - 1) {
            newQuestion = questions.at(0)
            setPosition(0)
        } else {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            newQuestion = questions.at(tempPosition + 1)
            setPosition(tempPosition + 1)
        }
        if (newQuestion.options.length > 1) {
            setAnswers(newQuestion.options.map(o => 0))
        } else {
            setAnswers([])
        }
    }
    const handlePrev = async () => {
        let newQuestion;
        if (position <= 0) {
            newQuestion = questions.at(-1)
            setPosition(questions.length - 1)
        } else {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            newQuestion = questions.at(tempPosition - 1)
            setPosition(tempPosition - 1)
        }
        if (newQuestion.options.length > 1) {
            setAnswers(newQuestion.options.map(o => 0))
        } else {
            setAnswers([])
        }
    }

    return (
        <div className="hostingDisplay">
            <div className="questionDisplay">
                <QuestionDisplay givenQuestion={questions[position]} isAdmin={true} socket={socket}
                                 lecturer={lecturer}/>
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
                {questions[position].options.length > 1 ?
                    (questions[position].questionType === "CodeMCQ") ?
                        questions[position].options.map(option => {
                            const count = answers.at(questions[position].options.indexOf(option))
                            //console.log(`${option}: ${count}`)
                            //console.log(`ANSWERS: ${answers}`)

                            return <dl>
                                <dt>{parse(option)}</dt>
                                <dd>{count}</dd>
                            </dl>
                        })
                        :
                        questions[position].options.map(option => {
                            const count = answers.at(questions[position].options.indexOf(option))
                            //console.log(`${option}: ${count}`)
                            //console.log(`ANSWERS: ${answers}`)
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