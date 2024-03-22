import { useEffect, useState } from "react"

const SelectQuestionForm = ({classID, quiz_id, setQuiz}) => {    
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [classroom_questions, setClassroomQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [quiz_questions, setQuizQuestions] = useState([])
    const [tickboxes, setTickboxes] = useState(false)
    const [no_questions, setNoQuestions] = useState(true)

    
    const handleSubmission = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:4000/api/quizzes/' + quiz_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const quiz = await response.json()

        if(!quiz.ok){
            setError(quiz.error)
        }
        if(response.ok){
            update_quiz()
            
            setQuizQuestions([])
            make_tickboxes_false()
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    
    
    const update_quiz = async () => {
        const response = await fetch('http://localhost:4000/api/quizzes/' + quiz_id, {
            method: "PATCH",
            body: JSON.stringify({questions: quiz_questions}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }else{
            setQuiz(json)
        }
    }


    const add_to_quiz_questions = (index_tickboxes, new_question_id) => {
        const new_qq = [...quiz_questions, new_question_id]
        setQuizQuestions(new_qq)
        update_tickbox(index_tickboxes)
    }

    const update_tickbox = (index_tickboxes) => {
        tickboxes[index_tickboxes] = !tickboxes[index_tickboxes]
    }

    const make_tickboxes_false = () => {
        setTickboxes(tickboxes => {
            const new_tickboxes = [...tickboxes]
            return new_tickboxes.map(() => false)
        })
    }
    
    useEffect(() => {
        const fetchQuestions = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
                const result = await response.json()

                const num_questions = result.length
                setTickboxes(new Array(num_questions).fill(false))
                
                setClassroomQuestions(result)
                setLoading(false)

                if(num_questions>0){
                    setNoQuestions(false)
                }

            }
            catch (error){
                console.log("error: " + error)
            }
        }
        
        fetchQuestions()
    }, [])




    return(        
        <div>
            {loading ? (<p>Loading questions...</p>) : (
                <div>
                    {classroom_questions ? (<div>{no_questions ? (<h3>No questions available</h3>) : (
                        <div>
                            <h3 onClick={toggleForm} className="form-heading">Click to select questions</h3>
                            {classroom_questions ? (
                                <div>
                                    { showForm ? (
                                        <form className="create" onSubmit={handleSubmission}>
                                            {classroom_questions.map((cq, index) => (
                                                <div key={index}>
                                                    <div class="row" id="questionsToSelect">
                                                        <div class="col-sm-5"></div>
                                                        <div class="col-sm-1">
                                                            <input type="checkbox" id="question" checked={tickboxes[index]} onChange={() => add_to_quiz_questions(index, cq._id)}/>
                                                        </div>
                                                        <div class="col-sm-1">
                                                            <label htmlFor="question">{cq.question}</label>
                                                        </div>
                                                        <div class="col-sm-5"></div>
                                                            
                                                    </div>
                                                        
                                                </div>
                                            ))}

                                            <button className = "create">Select Questions</button>
                                            {error && <div className="error">{error}</div>}

                                        </form>
                                    ) : null }
                            </div>
                            ) : (
                                <p>Loading questions...</p>
                            )}
                        </div>
                    )}  </div>) : null }
                </div>
            )}
        </div>
    )
        
}
    
export default SelectQuestionForm