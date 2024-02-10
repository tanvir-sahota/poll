import { useQuestionContext } from "../hooks/useQuestionContext"

const QuestionDetails = ({ question }) => {
    
    const { dispatch } = useQuestionContext()

    const handleClick = async () => {
        const response = await fetch("/api/questions/" + question._id, {
            method: "DELETE"
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type: "DELETE_QUESTIONS", payload: json})
        }

    }
    
    return (
        <div className="question-details">
            <h4>{question.question}</h4>
            <p><strong>Options: </strong>{question.options}</p>
            <p><strong>Answer(s): </strong>{question.answers}</p>
            <p>{question.createdAt}</p>
            <span onClick={handleClick}>delete</span>

        </div>
    )
} 

export default QuestionDetails