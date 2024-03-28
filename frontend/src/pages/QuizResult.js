import {useEffect, useRef} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import {useQuestionContext} from "../hooks/useQuestionContext"
import {useLocation} from "react-router-dom"
import {useQuizResultContext} from "../hooks/useQuizResultContext";
import QuizDetails from "../components/QuizDetails";
import quiz from "./Quiz";
import QuestionResult from "../components/QuestionResult";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import BackButton from "../components/BackButton"


const QuizResult = () => {

    const classID = useLocation().pathname.split("/").at(1)
    const {quiz_results, dispatch} = useQuizResultContext()

    useEffect(() => {

        const fetchQuizResults = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quiz-results/` + classID, {method: 'GET'})
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_QUIZ_RESULTS", payload: json})
            }
        }
        fetchQuizResults()

    }, [])

    if (quiz_results == null ) {
        return <h2>"Still loading all quiz results..."</h2>
    }
    else{
        return (
            <div className="quizResults">
                <div className="row">
                    <div className="col-sm-11" style={{textAlign:"left"}}>
                        <h1>All quiz results</h1>
                    </div>
                    <div className="col-sm-1">
                        <BackButton />
                    </div>
                    <span className="split"/>
                </div>
                <div className="row">
                    {quiz_results.map( (quiz_result) => (
                        <div className="quizResultDetails">
                            {/* <h2> {quiz_result.createdAt.slice(0,10)} {quiz_result.createdAt.slice(11,16)}</h2> */}
                            <QuestionResult quiz_result_id={quiz_result._id} quiz_id={quiz_result.quiz} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default QuizResult