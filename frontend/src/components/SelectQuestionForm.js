import { useEffect, useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const SelectQuestionForm = ({classID, quiz_id}) => {    
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [classroom_questions, setClassroomQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [quiz_questions, setQuizQuestions] = useState([])
    const [tickboxes, setTickboxes] = useState(false)


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
            make_tickboxes_false()
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const add_to_quiz_questions = (index_tickboxes, new_question) => {
        const new_qq = [...quiz_questions, new_question]
        setQuizQuestions(new_qq)

        update_tickbox(index_tickboxes)
    }

    const update_tickbox = (index_tickboxes) => {
        tickboxes[index_tickboxes] = !tickboxes[index_tickboxes]
    }

    const make_tickboxes_false = () => {
        setTickboxes(tickboxes.map(() => false))
    }
    
    useEffect(() => {
        const fetchQuestions = async () =>{
            try{
                const response = await fetch("http://localhost:4000/api/questions/" + classID)
                const result = await response.json()

                const num_questions = result.length
                setTickboxes(new Array(num_questions).fill(false))
                                
                setClassroomQuestions(result)
                setLoading(false)

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
                {loading ? (
                    <p>Loading questions...</p>
                    ) : (
                        <div>
                        <h3 onClick={toggleForm} className="form-heading">Select questions</h3>
                        {classroom_questions ? (
                            <div>
                                { showForm ? 
                                    <form className="create" onSubmit={handleSubmission}>
                                        {classroom_questions.map((cq, index) => (
                                            <div key={index}>
                                                <input type="checkbox" id="question" checked={tickboxes[index]} onChange={() => add_to_quiz_questions(index, cq.question)} />
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