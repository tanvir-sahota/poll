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
                <h1>
                    All quiz results
                </h1>
                {quiz_results.map( (quiz_result) => (
                    <div className="quizResultDetails">
                        <h2> {quiz_result.createdAt.slice(0,10)} {quiz_result.createdAt.slice(11,16)}</h2>
                        <QuestionResult quiz_result_id={quiz_result._id} quiz_id={quiz_result.quiz} />
                    </div>
                ))}

            </div>
        )
    }
    // else if (!Array.isArray(quiz_results)) {
    //     return (
    //     <div className="quizResults">
    //         <h1>
    //             Quiz Results
    //         </h1>
    //         <QuizResultDetails quiz_result_id={quiz_results._id} key={quiz_results._id} />
    //     </div>
    // )
    // }
    // else {

    // }
}

export default QuizResult


