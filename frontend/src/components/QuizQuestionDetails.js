import { useState } from "react"
import { useNavigate } from "react-router-dom"

const QuizQuestionDetails = ({ question, classID }) => {
    
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(question.options.length != 0 ? true : false)

    const hostQuestion = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        const {username} = data
        navigate(`/${username}/admin`, {state:{currentClassID: classID, currentQuestion: question}})
    } 
    
    return (
        <div className="question-details">
            <h4>{question?.question}</h4>
            {showOptions ? <p><strong>Options: </strong>{question?.options?.toString()}</p> : null}
            <p><strong>Answer(s): </strong>{question?.answers?.toString()}</p>
            <input type="submit" className="host" value="HOST" onClick={hostQuestion}/>
            <p><strong>{question?.questionType}</strong></p>
        </div>
    )
} 

export default QuizQuestionDetails