import {useEffect} from "react";
import {useQuizzesContext} from "../hooks/useQuizzesContext";

//components
import QuizDetails from "../components/QuizDetails"
import QuizForm from "../components/QuizForm";

const Quiz = () => {

    const {quizzes, dispatch} = useQuizzesContext()
    // Fires once when the component first renders
    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch('/api/quizzes')
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
export default Quiz