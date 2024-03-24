import { useState } from "react"


const MCQButton = (inputData) => {
    const {option, socket, lecturer} = inputData
    const [pressed, setPressed] = useState(false)

    const codeTag = "<code>"
    const endOfStartTag = option.search(codeTag) + codeTag.length
    const startOfEndTag = option.length - codeTag.length - 1
    const codeOptionValue = option.slice(endOfStartTag, startOfEndTag)
    
    
    const submitMCQAnswer = (option) => {
        socket.emit("submit-answer-MCQ", lecturer , option)
        setPressed(true)
        console.log("Option is ", option)
    }

    const unSubmitMCQ = (option) => {
        socket.emit("unsubmit-answer-MCQ", lecturer , option)
        setPressed(false)
        console.log("Option is ", option)
    }

    const handleMCQ = (option) => {
        !pressed ? submitMCQAnswer(option) : unSubmitMCQ(option)
    }
    
    const buttonColour = pressed ? {backgroundColor: "red"} : {backgroundColor: "goldenrod"}

    return(
        <button style={buttonColour} key={option} className={pressed ? "pOption" : "unpOption"} onClick={() => handleMCQ(option)}>
            {option.includes("<code>") ? codeOptionValue: option}
        </button>
    )
}

export default MCQButton