import { useEffect, useState } from "react"

const SelectQuestionForm = ({classID}) => {    
    const [classroom_questions, setClassroomQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [no_questions, setNoQuestions] = useState(true)
    
    useEffect(() => {
        const fetchQuestions = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
                const result = await response.json()

                console.log("sqiq: " + classID)
                
                const num_questions = result.length
                
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
            {loading ? (
                <p>Loading questions...</p>
                ) : (
                    <div>
                        {classroom_questions ? (
                            <div>
                                {no_questions ? (
                                    <h3>No questions available</h3>
                                ) : (
                                    <div>




                                        <h1>QUESTIONS ARE LOADED</h1>
                                        {/* THIS IS WHERE THE QUESTION CARDS GO */}






                                    </div>
                                )}
                                
                            </div>
                        ) : null }
                    </div>
                )}
        </div>
        
        )
        
}
    
export default SelectQuestionForm