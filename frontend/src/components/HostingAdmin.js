import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"

const HostingAdmin = (newClassID, currentQuestion) => {
    const classID = newClassID.newClassID
    const [question, setQuestion] = useState(newClassID.currentQuestion)
    const {questions, dispatch} = useQuestionContext()
    const [position, setPosition] = useState(questions.findIndex((x) => x._id === question._id)) 
    
    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:4000/api/questions/${classID}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
        }
        fetchQuestions()
    }, [])

    const handlePress = async () => {
        const tempPosition = questions.findIndex((x) => x._id === question._id)
        if(position >= questions.length - 1){
            setQuestion(questions.at(0))
            setPosition(0)     
        }
        else{
            setQuestion(questions.at(tempPosition + 1))
            setPosition(tempPosition + 1)             
        }
    }
    const handlePrev = async () => {
        const tempPosition = questions.findIndex((x) => x._id === question._id)
        if(position <= 0){
            setQuestion(questions.at(-1))
            setPosition(questions.length - 1)     
        }
        else{
            setQuestion(questions.at(tempPosition - 1))
            setPosition(tempPosition - 1)             
        }
    }

return(

    <div>
        <p>
            {question.question}
                <br></br>
                    {question.options}
                <br></br>
            {question.answers}
        </p>
        <button onClick={handlePress}>
            NEXT QUESTION
        </button>
        <button onClick={handlePrev}>
            PREVIOUS QUESTION
        </button>
            
    </div>
)

}
export default HostingAdmin