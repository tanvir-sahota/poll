import { useEffect} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import { useQuestionContext } from "../hooks/useQuestionContext"
import { useLocation } from "react-router-dom"


const QuestionBank = () => {

    const classID = useLocation().pathname.split("/").at(1)

    const {questions, dispatch} = useQuestionContext()

    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}/questions/` + classID)
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
                    <QuestionDetails question = {question} key={question._id} classID = {classID} />
                ))}
            </div>
            <QuestionForm classID = {classID}/>
        </div>
    )
}

export default QuestionBank


