import { useEffect} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import { useQuestionContext } from "../hooks/useQuestionContext"

const QuestionBank = () => {

    const {questions, dispatch} = useQuestionContext()

    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch("/api/questions")
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
        }

        fetchQuestions()

    }, [])

    return(
        <div className="questionBank">
            <div className="questions">
                {questions && questions.map(question => (
                    <QuestionDetails question = {question} key={question._id}  />
                ))}
            </div>
            <QuestionForm/>
        </div>
    )
}

export default QuestionBank


