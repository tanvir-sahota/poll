import {useEffect} from "react";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import QuizDetails from "../components/quiz/QuizDetails"
import QuizForm from "../components/forms/QuizForm";

const QuizDashboard = () => {

    const {quizzes, dispatch} = useQuizzesContext()
    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_QUIZZES', payload: json})
            }
        }

        fetchQuizzes()
    }, [])

    return (
        <div className="quiz">
            <h2>Quiz</h2>
            <div className="quizzes">
                {quizzes && quizzes.map((quiz) => (
                    <QuizDetails key={quiz._id} quiz={quiz}/>
                ))}
            </div>
            <QuizForm/>
        </div>
    )
}
export default QuizDashboard