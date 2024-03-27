import {useQuestionContext} from "../hooks/useQuestionContext";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import QuizQuestionDetails from "../components/QuizQuestionDetails";
import ShowSelectQuestion from "../components/ShowSelectQuestion"
import { useQuizzesContext } from "../hooks/useQuizzesContext";
import BackButton from "../components/BackButton";

const Quiz = () => {

    const [error, setError] = useState(null)
    const {quiz_id, classroom_id} = useParams()
    const {questions, dispatch} = useQuestionContext()
    const {quiz, dispatch: dispatch_quiz} = useQuizzesContext()

    useEffect(() => {

        const fetchQuiz = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classroom_id)
            const json = await response.json()

            if (response.ok) {
                const response2 = await fetch(`${process.env.REACT_APP_URL}api/quizzes/` + quiz_id, {method: 'GET'})
                const json2 = await response2.json()

                if (response2.ok) {
                    dispatch_quiz({type:"SET_QUIZ", payload: json2})
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
            <div className="row">
                <div className="col-sm-11"></div>
                <div className="col-sm-1">
                    <BackButton />
                </div>
            </div>
            <div className="row">
            <hr className="split"></hr>
                <div className="col-sm-5">
                    <div className="row-sm-2" id="quizDetails">
                        <div className="card">
                            <h3 className="card-title">
                                {quiz.title}
                            </h3>
                            <div className="card-body">
                                <i>{quiz.description}</i>
                            </div>
                        </div>
                        <ShowSelectQuestion classroom_id={classroom_id} quiz_id={quiz_id}/>
                    </div>
                </div>
                <div className="col-sm-7">
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