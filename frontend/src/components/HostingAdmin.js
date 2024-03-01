import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"

const HostingAdmin = (newClassID, currentQuestion) => {
    const classID = newClassID
    const question = classID.currentQuestion
    // const question = currentQuestion
    const [questionFetched, getQuestion] = useState({})

    useEffect(() => {
        
    // const fetchQuestion = async () => {
    //     const response = await fetch(`http://localhost:4000/api/questions/${classID}/${questionID}`)
    //     const json = await response.json()
    //     console.log(json)
    //     if (response.ok) {
    //          getQuestion(json)
    //     }
    // }

    // fetchQuestion()

    }, [])


return(

    <div>
        <p>
            {question.question}
                <br></br>
                    {question.options}
                <br></br>
            {question.answers}
        </p>
    </div>
)

}
export default HostingAdmin