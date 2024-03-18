import {useQuestionContext} from "../hooks/useQuestionContext";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import ShowSelectQuestion from "../components/ShowSelectQuestion"

const QuizResult = () => {

    const [quizResult, setQuizResult] = useState(null)
    const [error, setError] = useState(null)

    const {quiz_id, classroom_id} = useParams()
    const {questions, dispatch} = useQuestionContext()


    useEffect(() => {

        const fetchQuizResult = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/questionResults/` + classroom_id)
            const json = await response.json()

            if (response.ok) {
                const response2 = await fetch(`${process.env.REACT_APP_URL}api/quizResults/` + quiz_id, {method: 'GET'})
                const json2 = await response2.json()

                if (response2.ok) {
                    setQuizResult(json2)
                    const {questions} = json2
                    const filteredQuestions = json.filter(x => questions.includes(x._id))
                    dispatch({type: "SET_QUESTIONS", payload:filteredQuestions})
                }
                else{
                    setError(json2.error)
                }
            }
            else{
                setError(json.error)
            }
        }
        fetchQuizResult()
    }, [quizResult])

    if (quizResult==null) {
        return <h2>"Still loading..."</h2>
    }
    return (
        <div className="quizResult">
            <h2>QuizResult</h2>
            <br/>
            <br/>
            <div className="quizResults">
                <h3>{quizResult.title}</h3>
                <h3>{quizResult.description}</h3>
            </div>


            <br/>
            <br/>
            <br/>
            <br/>


            <ShowSelectQuestion classroom_id={classroom_id} quiz_id={quiz_id} setQuizResult={setQuizResult}/>
            
            

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default QuizResult