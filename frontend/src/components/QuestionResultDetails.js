import {useQuizResultContext} from "../hooks/useQuizResultContext";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useQuestionResultContext} from "../hooks/useQuestionResultContext";

const QuestionResultDetails = (params) => {

    const classID = useLocation().pathname.split("/").at(1)

    const {id} = params

    // const {id} = quizResult
    const {question_results, dispatch} = useQuestionResultContext()

    useEffect(() => {
        const fetchQuestionResults = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/question-results/` + classID + "/" + id, {method: 'GET'})
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUESTION_RESULTS", payload:json})
            }
        }
        fetchQuestionResults()

    }, [])

    return(
        <div>
            {question_results && question_results.map((questionResult) => (
                <button>
                    {questionResult.quiz.quiz}
                </button>
            ))}
        </div>
    )
}

export default QuestionResultDetails