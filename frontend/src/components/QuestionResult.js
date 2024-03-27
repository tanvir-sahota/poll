import {useQuizResultContext} from "../hooks/useQuizResultContext";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useQuestionResultContext} from "../hooks/useQuestionResultContext";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useQuestionContext} from "../hooks/useQuestionContext";

const QuestionResult = (params) => {

    const classID = useLocation().pathname.split("/").at(1)

        const [error, setError] = useState(null)


    const {quiz_result_id} = params
    const {quiz_id} = params

    const {question_results, dispatch} = useQuestionResultContext()
    const {quiz, dispatch: dispatch_quiz} = useQuizzesContext()
    const {questions, dispatch: dispatch_questions} = useQuestionContext()



    useEffect(() => {
        const fetchQuestionResults = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/question-results/` + quiz_result_id, {method: 'GET'})
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUESTION_RESULTS", payload:json})
            }
        }
        fetchQuestionResults()

    }, []);


    useEffect(() => {

        const fetchQuiz = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
            const json = await response.json()

            if (response.ok) {
                const response2 = await fetch(`${process.env.REACT_APP_URL}api/quizzes/` + quiz_id, {method: 'GET'})
                const json2 = await response2.json()

                if (response2.ok) {
                    dispatch_quiz({type:"SET_QUIZ", payload: json2})
                    const {questions} = json2
                    const filteredQuestions = json.filter(x => questions.includes(x._id))
                    dispatch_questions({type: "SET_QUESTIONS", payload:filteredQuestions})
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
    }, [])


    if (quiz == null || question_results == null || questions == null){
        return <h2>"Still loading all question results..."</h2>
    }
    else {
        const question_and_answer_map = new Map()
        for (let i = 0; i < questions.length; i ++) {
            question_and_answer_map.set(questions[i], question_results[i])
        }
     return (
            <div className="card" id="cardOne">
                <h2> Results for {quiz.title}</h2>
                {Array.from(question_and_answer_map).map(pair => (
                    <div className="card" id="cardTwo">
                        <div className="row">
                            <h4 id="question-result-heading"> {pair[0].question} </h4>
                            <div className="col-sm-8">
                                {pair[0].options.map( (question) => <p>{question}</p>) }
                            </div>
                            <div className="col-sm-3">
                                {pair[1].questionResultsArray.map( (answer) => <p>{answer}</p>)}
                            </div>
                        </div>
                    </div>
                ))}
                <h3>
                    Correct answers:
                </h3>
                <div className="card" id="cardThree">
                    <div className="row">
                            <div className="col-sm-3">
                                {questions.map( (question) => <p>{question.question} :</p>) }
                            </div>
                            <div className="col-sm-9">
                                {questions.map( (question) => <p id="quiz-result-answers">{question.answers}</p>)}
                            </div>
                        </div>
                </div>

            </div>
        )
    }
}

export default QuestionResult