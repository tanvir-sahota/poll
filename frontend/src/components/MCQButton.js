import { useState } from "react"


const MCQButton = (inputData) => {
    const {option, socket} = inputData
    const [pressed, setPressed] = useState(false)

    const submitMCQAnswer = (option) => {
        socket.emit("submit-answer-MCQ", "habram" , option)
        setPressed(true)
        console.log("Option is ", option)
    }

    const unSubmitMCQ = (option) => {
        socket.emit("unsubmit-answer-MCQ", "habram" , option)
        setPressed(false)
        console.log("Option is ", option)
    }

    const handleMCQ = (option) => {
        !pressed ? submitMCQAnswer(option) : unSubmitMCQ(option)
    }

    return(
        <button key={option} className={pressed ? "pOption" : "unpOption"} onClick={() => handleMCQ(option)}>{option}</button>
    )
}

export default MCQButton