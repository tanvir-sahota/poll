import {useState} from "react";
import {useQuizzesContext} from "../hooks/useQuizzesContext";

const QuizForm = () => {
    const{dispatch} = useQuizzesContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const quiz = {title, description}
        const response = await fetch('/api/quizzes', {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('new quiz added', json)
            dispatch({type:'CREATE_QUIZ', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a new quiz</h3>
            <label>Quiz title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                />
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                />
            <button> Add Quiz</button>
            {error && <div className={"error"}>{error}</div>}
        </form>
    )
}

export default QuizForm