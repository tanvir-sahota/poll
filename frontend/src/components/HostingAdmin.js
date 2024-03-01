import { useQuestionContext } from "../hooks/useQuestionContext"
import { useEffect } from "react"
import { useState } from "react"

const HostingAdmin = (newClassID, currentQuestion) => {
    //let question = newClassID.currentQuestion
    // const question = currentQuestion
    const classID = newClassID.newClassID
    const [question, setQuestion] = useState(newClassID.currentQuestion)
    const {questions, dispatch} = useQuestionContext()
    const [position, setPosition] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`http://localhost:4000/api/questions/${classID}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
            // console.log(position)
        }
        fetchQuestions()

    }, [])


    const handlePress = async () => {
        // console.log(question._id)
        // console.log(questions)
        const tempPosition = questions.findIndex((x) => x._id = question._id)
        console.log("Temp position ", tempPosition)
        console.log("Position ",position)
        if(position >= questions.length - 1){
            setQuestion(questions.at(0))
            setPosition(0)     
        }
        else{
            setQuestion(questions.at(tempPosition + 1))
            setPosition(tempPosition + 1)             
        }
    

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