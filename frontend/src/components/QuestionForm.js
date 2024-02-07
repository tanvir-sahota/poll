import { useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const QuestionForm = () => {

    const {dispatch} = useQuestionContext()
    const [questionAsked, setQuestion] = useState("")
    const [options, setOptions] = useState("")
    const [answers, setAnswers] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmission = async (e) => {
        e.preventDefault()

        const question = {questionAsked, options, answers}

        const response = await fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setQuestion("")
            setOptions("")
            setAnswers("")
            setError(null)
            setEmptyFields([])
            console.log("Successful added workout")
            dispatch({type: "CREATE_QUESTIONS", payload: json})
        }
    }

    return(
        <form className="create" onSubmit={handleSubmission}>
            <h3>Add a new Question</h3>

            <label>Question</label>
            <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                value={questionAsked}
                className={emptyFields.includes("question") ? "error" : ""}
            />

            <label>Options</label>
            <input
                type="text"
                onChange={(e) => setOptions(e.target.value)}
                value={options}
                className={emptyFields.includes("options") ? "error" : ""}
            />

            <label>Answers</label>
            <input
                type="text"
                onChange={(e) => setAnswers(e.target.value)}
                value={answers}
                className={emptyFields.includes("answers") ? "error" : ""}
            />

            <button>Add Question</button>
            {error && <div className="error">{error}</div>}

        </form>
    )

}

export default WorkoutForm