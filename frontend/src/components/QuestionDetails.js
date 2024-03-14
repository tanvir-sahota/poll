import { useQuestionContext } from "../hooks/useQuestionContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import UpdateQuestionForm from "./UpdateQuestionForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { QuestionContext } from "../context/QuestionContext"

const QuestionDetails = ({ question, classID, onlyDisplayQuestions }) => {
    if(onlyDisplayQuestions==undefined || onlyDisplayQuestions=="undefined"){
        onlyDisplayQuestions = false
    }

    const { dispatch } = useQuestionContext()
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false)
    const [showOptions, setShowOptions] = useState(question.options.length != 0 ? true : false)
    //const {username} = localStorage.getItem("user")

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
            <span onClick={deleteQuestion}>delete</span>

            {onlyDisplayQuestions ? null : (
                <div>
                    <input type="submit" className="host" value="HOST" onClick={hostQuestion}/>
                    <input type="submit" className="edit" value= {showForm ? "Hide" : "Edit"} onClick={editQuestion}/>
                </div>
            )}


            <p><strong>{question?.questionType}</strong></p>
            <div>
            { showForm ? <UpdateQuestionForm classID={classID} question = {question} setShowForm={setShowForm} setShowOptions={setShowOptions}/> : null }
            </div>
        </div>
    )
} 

export default QuestionDetails