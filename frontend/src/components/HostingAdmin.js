import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"

const HostingAdmin = (newClassID, currentQuestion) => {
    
    let question = newClassID.currentQuestion
    // const question = currentQuestion
    const classID = newClassID.newClassID
    const [questions, setQuestion] = useState([])
    
    const [position, setPosition] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:4000/api/questions/${classID}`)
            const json = await response.json()
            setQuestion(json)
            if (response.ok) {
                  setQuestion(json)
            }
        }
        fetchQuestions()
   

    }, [])


    const handlePress = async () => {
        // const position = questions.indexOf(question)
        // question = questions.at(position + 1)
        setPosition(position + 1)
        // edge cases to be handed

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
            {/* <p>current: {questions[position].question}</p> */}
    </div>
)

}
export default HostingAdmin