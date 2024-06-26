import { useQuestionContext } from "../../hooks/useQuestionContext"
import UpdateQuestionForm from "../forms/UpdateQuestionForm"
import { useState } from "react"

const QuestionDetails = ({ question, classID }) => {
    
    const { dispatch } = useQuestionContext()
    const [showForm, setShowForm] = useState(false)
    const [showOptions, setShowOptions] = useState(question.options.length !== 0 ? true : false)

    const deleteQuestion = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}api/questions/${classID}/${question._id}`, {
            method: "DELETE"
        })
        const json = await response.json()
        
        if(response.ok){
            dispatch({type: "DELETE_QUESTIONS", payload: json})
        }

    }
    const editQuestion = () => {
        setShowForm(!showForm)
    }
    
    return (
        <div className="question-details">
            <h4>{question?.question}</h4>
            {showOptions ? <p><strong>Options: </strong>{question?.options?.toString()}</p> : null}
            <p><strong>Answer(s): </strong>{question?.answers?.toString()}</p>
            <div className="deleteIcons">
                <span className="material-symbols-outlined" onClick={deleteQuestion}>Delete</span>
            </div>
            <p><strong>{question?.questionType}</strong></p>
            <div>
                <input type="submit" className="edit" value= {showForm ? "Hide" : "Edit"} onClick={editQuestion}/>
                { showForm ? <UpdateQuestionForm classID={classID} question = {question} setShowForm={setShowForm} setShowOptions={setShowOptions}/> : null }
            </div>
        </div>
    )
} 

export default QuestionDetails