import { useEffect, useState } from 'react'
import { useQuestionContext } from '../hooks/useQuestionContext'
import QuestionDetails from './QuestionDetails'

const ClassroomDropdown = (newClassID) =>{
    
    const [questions, setQuestion] = useState([])
    
    const {classID} = newClassID
    console.log(classID)

    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch("http://localhost:4000/api/questions/" + classID)
            const json = await response.json()
            if(response.ok){
            setQuestion(json)
            }
            //console.log(questions)
        }

        fetchQuestions()

    }, [])


    return(

        <div>
            <select name="hostingDropdown" id="hostingDropdown">
                {questions && questions.map((question, index) => (
                <option key={index} value={question.question}>
                    {question.question}
                </option>
                ))}
            </select>
        </div>

    )
}

export default ClassroomDropdown