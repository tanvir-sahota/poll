import {useQuestionContext} from "../hooks/useQuestionContext";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import QuizQuestionDetails from "../components/QuizQuestionDetails";

import ShowSelectQuestion from "../components/ShowSelectQuestion"

const Quiz = () => {

    const [quiz, setQuiz] = useState(null)
    const [error, setError] = useState(null)

    const {quiz_id, classroom_id} = useParams()
    const {questions, dispatch} = useQuestionContext()


    useEffect(() => {

        const fetchQuiz = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classroom_id)
            const json = await response.json()

            if (response.ok) {
                const response2 = await fetch(`${process.env.REACT_APP_URL}api/quizzes/` + quiz_id, {method: 'GET'})
                const json2 = await response2.json()

                if (response2.ok) {
                    setQuiz(json2)
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
        fetchQuiz()
    }, [quiz])

    if (quiz==null) {
        return <h2>"Still loading..."</h2>
    }

    

    return (
        <div className="quiz">
            <div class="row">

                <div class="col-sm-5">
                    <div class="row-sm-6" id="quizDetails">
                        <div class="card">
                            <h3 class="card-title">
                                Quiz
                            </h3>
                            <div class="card-body">
                                Title: {quiz.title}
                            </div>
                            <div class="card-body">
                                Description: {quiz.description}
                            </div>
                        </div>
                    </div>
                    <ShowSelectQuestion classroom_id={classroom_id} quiz_id={quiz_id} setQuiz={setQuiz}/>
                </div>



                <div class="col-sm-7">
                    <div className="questions">
                        {questions.length > 0 && questions.map(question => (
                            <QuizQuestionDetails question = {question} key={question._id} classID = {classroom_id} />
                        ))}
                    </div>
                </div>

            </div>
            

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default Quiz