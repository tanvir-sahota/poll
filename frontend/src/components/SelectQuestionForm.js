import { useEffect, useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const SelectQuestionForm = ({classID, quiz_id}) => {    
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [classroom_questions, setClassroomQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [quiz_questions, setQuizQuestions] = useState([])


    const handleSubmission = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/quizzes/' + quiz_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const quiz = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            quiz.questions.push(quiz_questions)
            setQuizQuestions([])
            console.log(quiz.questions)
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const add_to_quiz_questions = (new_question) => {
        const new_qq = [...quiz_questions, new_question]
        setQuizQuestions(new_qq)

        console.log(quiz_questions)
    }
    
    useEffect(() => {
        const fetchQuestions = async () =>{
            try{
                const response = await fetch("http://localhost:4000/api/questions/" + classID)
                const result = await response.json()
                setClassroomQuestions(result)


                setLoading(false)
                console.log(classroom_questions)
            }
            catch (error){
                console.log("error: " + error)
            }
        }
        
        fetchQuestions()
    }, [])



        
    return(        
        <div>
            <div>
                <h3 onClick={toggleForm} className="form-heading">Select questions</h3>
                {loading ? (
                <p>Loading questions...</p>
                ) : (
                    <div>
                        {classroom_questions ? (
                            <div>
                                { showForm ? 
                                    <form className="create" onSubmit={handleSubmission}>
                                        {classroom_questions.map((cq, index) => (
                                            <div key={index}>
                                                <input type="checkbox" id="question" onChange={() => add_to_quiz_questions(cq._id)} />
                                                <label htmlFor="question">{cq.question}</label>
                                            </div>
                                        ))}

                                        <button className = "create">Select Questions</button>
                                        {error && <div className="error">{error}</div>}

                                    </form>
                                : null }
                            </div>
                        ) : (
                            <p>Loading questions...</p>
                        )}
                    </div>
                )}

            </div>
        </div>
        
        )
        
}
    
export default SelectQuestionForm