import { useEffect, useState } from 'react'

const ClassroomDropdown = (newClassID) =>{
    
    const [questions, setQuestion] = useState([])
    
    const {classID} = newClassID

    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
            const json = await response.json()
            if(response.ok){
                setQuestion(json)
            }
        }

        fetchQuestions()

    }, [])


    return(

        <div>
            {questions && questions.map((question, index) => (
                <button key={index} value={question.question}>
                    {question.question}
                </button>
            ))}
        </div>

    )
}

export default ClassroomDropdown