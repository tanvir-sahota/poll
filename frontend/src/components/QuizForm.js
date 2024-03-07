import {useState} from "react";
import {useQuizzesContext} from "../hooks/useQuizzesContext";

const QuizForm = (classID) => {
    
    
    const {dispatch} = useQuizzesContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    
    const classroom = classID_value(classID)

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        
        const quiz = {title, description, classroom}
        const response = await fetch('/api/quizzes', {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('new quiz added', json)
            dispatch({type: 'CREATE_QUIZ', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit} title="quiz form">
            <h3> Add a new quiz</h3>
            <label>Quiz title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder={"Input the new title"}
                />
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder={"Input the new description"}
                />
            <button> Add Quiz</button>
            {error && <div className={"error"}>{error}</div>}
        </form>
    )
}

const classID_value = (classID) => {
    if(classID!=null && classID.classID!=null){
        return classID.classID
    }
    else{
        return ""
    }
}


export default QuizForm