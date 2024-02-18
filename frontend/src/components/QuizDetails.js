import {useQuizzesContext} from "../hooks/useQuizzesContext";

const QuizDetails = ({quiz}) => {

    const {dispatch} = useQuizzesContext()

    /**
     * Handles quiz delete requests
     * @returns {Promise<void>}
     */
    const handleClick = async () => {
        const response = await fetch('/api/quizzes/' + quiz._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_QUIZ', payload: json})
        }
    }

    return (
        <div className="quiz-details">
            <h4>{quiz.title} </h4>
            <p><strong>Description: </strong> {quiz.description}</p>
            <span onClick={handleClick}>delete</span>
            <p><a href={quiz._id}>"Go to this quizzes page"</a></p>
        </div>
    )
}

export default QuizDetails