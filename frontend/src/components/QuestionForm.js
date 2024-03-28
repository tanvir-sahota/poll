import { useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const QuestionForm = (classID) => {

    const {dispatch} = useQuestionContext()
    const [questionAsked, setQuestion] = useState("")
    const [options, setOptions] = useState("")
    const [answers, setAnswers] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

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
            setSuccess(null)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setQuestion("")
            setOptions("")
            setAnswers("")
            setError(null)
            setSuccess("Successful Creation!")
            setEmptyFields([])
            dispatch({type: "CREATE_QUESTIONS", payload: json})
        }
    }

    return(
        <div>
            <h2>Create Question</h2>
            <br></br>
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

                <button>Add Question</button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </form>
        </div>
        
    )

}

export default QuestionForm