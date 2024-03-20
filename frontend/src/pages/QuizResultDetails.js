import { useEffect} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import { useQuestionContext } from "../hooks/useQuestionContext"
import { useLocation } from "react-router-dom"
import {useQuizResultContext} from "../hooks/useQuizResultContext";
import QuizDetails from "../components/QuizDetails";
import QuestionResultDetails from "../components/QuestionResultDetails";


const QuizResult = ({id}) => {

    const classID = useLocation().pathname.split("/").at(1)

    const {quiz_result, dispatch} = useQuizResultContext()

    const quizID = id

    useEffect(() => {
        const fetchQuizResult = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/quiz-results/` + classID + '/' + quizID.toString())
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUIZ_RESULT", payload:json})
            }
        }
        fetchQuizResult()

    }, [])

    if (quiz_result==null) {
        return <h2>"Still loading..."</h2>
    }
    // <QuestionResultDetails key={quiz_result?.quiz?._id}/>
    return(
            <div className="quizResultDetails">
                <QuestionResultDetails id={quiz_result._id} />
            </div>
    )
}

export default QuizResult


