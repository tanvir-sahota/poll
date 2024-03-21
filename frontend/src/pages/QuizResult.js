import { useEffect} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import { useQuestionContext } from "../hooks/useQuestionContext"
import { useLocation } from "react-router-dom"
import {useQuizResultContext} from "../hooks/useQuizResultContext";
import QuizDetails from "../components/QuizDetails";
import QuestionResultDetails from "../components/QuestionResultDetails";
import QuizResultDetails from "./QuizResultDetails";


const QuizResult = () => {

    const classID = useLocation().pathname.split("/").at(1)

    const {quiz_result, dispatch} = useQuizResultContext()

    useEffect(() => {
        const fetchQuizResults = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/quiz-results/` + classID, {method: 'GET'})
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUIZ_RESULTS", payload:json})
            }
        }
        fetchQuizResults()

    }, [])

    console.log(quiz_result[0]._id.toString())

    return(
            <div className="quizResults">
                <h1>
                    Quiz Results
                </h1>
                {quiz_result && quiz_result.map((quizResult) => (

                    <QuizResultDetails id={quizResult._id}/>
                ))}
            </div>
    )
}

export default QuizResult


