import {useQuestionContext} from "../hooks/useQuestionContext"
import {useEffect, useState} from "react"
import QuestionDisplay from "./QuestionDisplay"
import parse from 'html-react-parser'

const HostingAdmin = (inputData) => {
    const {socket, currentQuestion, lecturer} = inputData
    const {questions} = useQuestionContext()
    const [position, setPosition] = useState(questions.findIndex(q => q._id === currentQuestion._id))
    const [answers, setAnswers] = useState(questions.map((q => q.options.length > 1 ? q.options.map(o => 0) : [])))

    useEffect(() => {
        let receiveTextHandler = null
        receiveTextHandler = answer => {
            setAnswers(prevAnswers => {
                const allAnswers = [...prevAnswers]
                allAnswers[position] = [...prevAnswers[position], answer]
                return allAnswers
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
        if (position >= questions.length - 1) {
            setPosition(0)
        } else {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition + 1)
        }
    }
    const handlePrev = async () => {
        if (position <= 0) {
            setPosition(questions.length - 1)
        } else {
            const tempPosition = questions.findIndex((x) => x._id === questions[position]._id)
            setPosition(tempPosition - 1)
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
                            const count = answers[position].at(questions[position].options.indexOf(option))
                            //console.log(`${option}: ${count}`)
                            //console.log(`ANSWERS: ${answers}`)

                            return <dl>
                                <dt>{parse(option)}</dt>
                                <dd>{count}</dd>
                            </dl>
                        })
                        :
                        questions[position].options.map(option => {
                            const count = answers[position].at(questions[position].options.indexOf(option))
                            //console.log(`${option}: ${count}`)
                            //console.log(`ANSWERS: ${answers}`)
                            return <dl>
                                <dt>{option}</dt>
                                <dd>{count}</dd>
                            </dl>
                        })
                    :
                    answers[position] && answers[position].map(answer => (<p>{answer}</p>))
                }
            </div>
        </div>
    )
}
export default HostingAdmin