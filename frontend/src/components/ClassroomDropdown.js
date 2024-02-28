import { useEffect } from 'react'
import { useQuestionContext } from '../hooks/useQuestionContext'
import QuestionDetails from './QuestionDetails'

const ClassroomDropdown = (classID) =>{
    
    const {questions, dispatch} = useQuestionContext()
    console.log(classID)

    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch("http://localhost:4000/api/questions/" + classID)
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
            //console.log(questions)
        }

        fetchQuestions()

    }, [])


    return(

        <>{questions && questions.map(question => (
            <option value={question.question}>{question.question}</option>
        ))}</>

    )
}

export default ClassroomDropdown