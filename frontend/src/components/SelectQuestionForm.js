import { useEffect, useState } from "react"
import { useQuestionContext } from "../hooks/useQuestionContext"

const SelectQuestionForm = (classID) => {
    









    const [classroom_questions, setClassroomQuestions] = useState([])
    useEffect(() => {
        const fetchQuestions = async () =>{
            try{
                const response = await fetch("http://localhost:4000/api/questions/" + classID.classID)
                const result = await response.json()
                setClassroomQuestions(result)
                console.log(result)
            }
            catch (error){
                console.log("error: " + error)
            }
        }
        
        fetchQuestions()
    }, [])
















    // const get_class_questions = async () => {
    //     const response = await fetch("http://localhost:4000/api/questions/", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     console.log(response.body)
    // }
    // get_class_questions()
    
    
    
    
    
    
    
    
    

    const {dispatch} = useQuestionContext()
    const [questionAsked, setQuestion] = useState("")
    const [options, setOptions] = useState("")
    const [answers, setAnswers] = useState("")
    
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [showForm, setShowForm] = useState(true)

    const handleSubmission = async (e) => {
        e.preventDefault()

        // const response = await fetch("http://localhost:4000/api/questions/" + classID.classID, {
        //     method: "PATCH",
        //     body: JSON.stringify(question),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // const json = await response.json()

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
            dispatch({type: "CREATE_QUESTIONS", payload: json})
        }
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }







    
    
    
    
    
    

    return(        
        <div>
            {classroom_questions ? (
                <p>{classroom_questions[1].question}</p>
            ) : (
                <p>nodababy</p>
            )}
            
            <h3 onClick={toggleForm} className="form-heading">Select questions</h3>
            {showForm ? 
                <form className="create" onSubmit={handleSubmission}>
                    <label>Questions</label>
                    <input type="checkbox" id="a"/>
                    <label for="a">2</label>
                    <input type="checkbox" id="b"/>
                    <label for="b">3</label>
                    <input type="checkbox" id="c"/>
                    <label for="c">4</label>
                    <input type="checkbox" id="d"/>
                    <label for="d">5</label>

                    <button className = "create">Select Question</button>
                    {error && <div className="error">{error}</div>}

                </form>
            : null}
        </div>
        
        )
        
    }
    
    export default SelectQuestionForm
    
    
    {/* // onChange={(e) => setQuestion(e.target.value)} */}
    {/* // value={questionAsked} */}
    // className={emptyFields.includes("questionAsked") ? "error" : ""}