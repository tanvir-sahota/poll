import { useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const UpdateQuestionForm = ({question, setShowForm, classID}) => {

    const {dispatch} = useQuestionContext()
    const [questionAsked, setQuestion] = useState(question.question.toString())
    const [options, setOptions] = useState(question.options.toString())
    const [answers, setAnswers] = useState(question.answers.toString())
    const [error, setError] = useState(null)

    const handleSubmission = async (e) => {
        e.preventDefault()

        const newQuestion = {questionAsked, options, answers}
        
        const response = await fetch("http://localhost:4000/api/questions/" + classID + "/" + question._id, {
            method: "PATCH",
            body: JSON.stringify(newQuestion),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            console.log("Successful updated question")
            dispatch({type: "UPDATE_QUESTIONS", payload: json})
            setShowForm(false)
        }
    }

    return(
        <form className="update" onSubmit={handleSubmission}>
            <h3>Update Questions</h3>

            <label>Question</label>
            <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                defaultValue={question.question}
                className={""}
            />

            <label>Options</label>
            <input
                type="text"
                onChange={(e) => setOptions(e.target.value)}
                defaultValue={question.options}
                className={""}
            />

            <label>Answers</label>
            <input
                type="text"
                onChange={(e) => setAnswers(e.target.value)}
                defaultValue={question.answers}
                className={""}
            />

            <p>Input as a comma seperated string for multiple answers and options</p>
            <p>Doesn't require all fields to be inputted</p>

            <button>Update Question</button>
            {error && <div className="error">{error}</div>}

        </form>
    )

}

export default UpdateQuestionForm