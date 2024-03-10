import { useEffect, useState } from "react"
// import { useQuizContext } from "../hooks/useQuizzesContext"

const SelectQuizForm = ({classID, folder_id}) => {    
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [classroom_quizzes, setClassroomQuizzes] = useState([])
    const [loading, setLoading] = useState(true)
    const [folder_quizzes, setFolderQuizzes] = useState([])
    const [tickboxes, setTickboxes] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmission = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/folders/' + folder_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const folder = await response.json()

        if(!response.ok){
            setError(folder.error)
            setEmptyFields(folder.emptyFields)
        }
        if(response.ok){
            update_folder(folder)
            
            setFolderQuizzes([])
            make_tickboxes_false()
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }
    
    
    const update_folder = async (folder) => {
        const response = await fetch('/api/folders/' + folder_id, {
            method: "PATCH",
            body: JSON.stringify({quizzes: folder_quizzes}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
    }


    const add_to_folder_quizzes = (index_tickboxes, new_quiz_id) => {
        const new_qq = [...folder_quizzes, new_quiz_id]
        setFolderQuizzes(new_qq)
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
        const fetchQuizzes = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes/` + classID)
                const result = await response.json()

                const num_quizzes = result.length
                setTickboxes(new Array(num_quizzes).fill(false))
                                
                setClassroomQuizzes(result)
                setLoading(false)

            }
            catch (error){
                console.log("error: " + error)
            }
        }
        
        fetchQuizzes()
    }, [])




    return(        
        <div>
            <div>
                {loading ? (
                    <p>Loading quizzes...</p>
                    ) : (
                        <div>
                        <h3 onClick={toggleForm} className="form-heading">Select quizzes</h3>
                        {classroom_quizzes ? (
                            <div>
                                { showForm ? 
                                    <form className="create" onSubmit={handleSubmission}>
                                        {classroom_quizzes.map((cq, index) => (
                                            <div key={index}>
                                                <input type="checkbox" id="quiz" checked={tickboxes[index]} onChange={() => add_to_folder_quizzes(index, cq._id)} />
                                                <label htmlFor="quiz">{cq.quiz}</label>
                                            </div>
                                        ))}

                                        <button className = "create">Select Quizzes</button>
                                        {error && <div className="error">{error}</div>}

                                    </form>
                                : null }
                            </div>
                        ) : (
                            <p>Loading quizzes...</p>
                        )}
                    </div>
                )}

            </div>
        </div>
        
        )
        
}
    
export default SelectQuizForm