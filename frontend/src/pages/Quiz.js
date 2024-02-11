import {useEffect, useState} from "react";

//components
import QuizForm from "../components/QuizForm";
const Quiz = () => {
    const [quizzes, setQuizzes] = useState(null)

    // Fires once when the component first renders
    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch('/api/quizzes')
            const json = await response.json()

            if (response.ok){
                setQuizzes(json)
            }
        }

        fetchQuizzes()
    }, [])

    return (
        <div className="quiz">
            <h2>Quiz</h2>
            <div className="quizzes">
                {quizzes && quizzes.map((quiz) => (
                    <p key={quiz._id}>{quiz.title}</p>
                ))}
            </div>
            <QuizForm />
        </div>
    )
}
export default Quiz