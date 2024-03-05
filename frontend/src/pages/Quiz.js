import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useParams, useRouteError} from "react-router-dom";
import {useEffect, useState} from "react";
import QuizDetails from "../components/QuizDetails";
import QuizForm from "../components/QuizForm";

const Quiz = () => {

    const {quiz,dispatch} = useQuizzesContext()
     const [error, setError] = useState(null)

    const {id} = useParams()
    console.log(id)

    // Fires once when the component first renders
    useEffect(() => {

        const fetchQuiz = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes/` + id, {method: 'GET'})
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_QUIZ', payload: json})
            }
            else{
                setError(json.error)
            }
        }
        fetchQuiz()
    }, [])


    if (quiz==null) {
        return <h2>"Still loading..."</h2>
    }
    return (
        <div className="quiz">
            <h2>Quiz</h2>
            <div className="quizzes">
                <h3>{quiz.title}</h3>
            </div>

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default Quiz