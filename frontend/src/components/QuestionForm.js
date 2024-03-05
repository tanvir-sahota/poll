import { useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const QuestionForm = (classID) => {

    const {dispatch} = useQuestionContext()
    const [questionAsked, setQuestion] = useState("")
    const [options, setOptions] = useState("")
    const [answers, setAnswers] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [showForm, setShowForm] = useState(false)

    const handleSubmission = async (e) => {
        e.preventDefault()

        const question = {questionAsked, options, answers}

        const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID.classID, {
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
            console.log("Successful added question")
            dispatch({type: "CREATE_QUESTIONS", payload: json})
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return(
        <div>
            <h3 onClick={toggleForm} className="form-heading">Add a new Question</h3>
        {showForm ? 
            <form className="create" onSubmit={handleSubmission}>
                <label>Question</label>
                <input
                    type="text"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={questionAsked}
                    className={emptyFields.includes("questionAsked") ? "error" : ""}
                />

                <label>Options</label>
                <input
                    type="text"
                    onChange={(e) => setOptions(e.target.value)}
                    value={options}
                    className={""}
                />

                <label>Answers</label>
                <input
                    type="text"
                    onChange={(e) => setAnswers(e.target.value)}
                    value={answers}
                    className={emptyFields.includes("answers") ? "error" : ""}
                />

                <p>Input as a comma seperated string for multiple answers and options</p>

                <button className = "create">Add Question</button>
                {error && <div className="error">{error}</div>}

            </form>
        : null}
        </div>
        
    )

}

export default QuestionForm