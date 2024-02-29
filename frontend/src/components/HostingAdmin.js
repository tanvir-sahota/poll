import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"

const HostingAdmin = (newClassID, currentQuestionID, currentQuestion) => {
    const {classID} = newClassID
    const {questionID} = currentQuestionID
    const {question} = currentQuestion
    const [questionFetched, getQuestion] = useState()

    useEffect(() => {
        
    const fetchQuestion = async () => {
        const response = await fetch(`http://localhost:4000/api/questions/${classID}/${questionID}`)
        const json = await response.json()
        console.log(json)
        if (response.ok) {
             getQuestion(json)
        }
    }

    fetchQuestion()

    }, [])


return(

    <div>
        <h1>
            {questionFetched.question}
        </h1>
    </div>
)

}
export default HostingAdmin