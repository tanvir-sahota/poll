import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useParams, useRouteError} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectQuestionForm from "../components/SelectQuestionForm";

import ShowSelectQuestion from "../components/ShowSelectQuestion"

const Quiz = () => {

    const {quiz,dispatch} = useQuizzesContext()
     const [error, setError] = useState(null)

    const {quiz_id, classroom_id} = useParams()
    

    // Fires once when the component first renders
    useEffect(() => {

        const fetchQuiz = async () => {
            const response = await fetch('/api/quizzes/' + quiz_id, {method: 'GET'})
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
            <br/>
            <br/>
            <div className="quizzes">
                <h3>{quiz.title}</h3>
                <h3>{quiz.description}</h3>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>


            <ShowSelectQuestion classroom_id={classroom_id} />
            
            

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default Quiz