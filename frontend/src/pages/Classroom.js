import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import {useQuizzesContext} from "../hooks/useQuizzesContext";

import { Link } from 'react-router-dom'


import QuizDetails from "../components/QuizDetails"
import QuizForm from '../components/QuizForm';

const Classroom = () => {
    const classID = useLocation().pathname.split("/").at(1)
    const {quizzes, dispatch: dispatch_quiz} = useQuizzesContext()    

    useEffect(() => {        
        const fetchQuizzes = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes`)
            const json = await response.json()

            if (response.ok) {
                dispatch_quiz({type: 'SET_QUIZZES', payload: json})
                const all_quizzes = json
                const classroom_quizzes = all_quizzes.filter((quiz) => quiz.classroom==classID)                
                assign_questions_to_quizzes(classroom_quizzes, classID)
            }
        }
        fetchQuizzes().then()
    }, [dispatch_quiz])
    return (
        <div className="dashboard">
            
            <h2>Classroom</h2>
            <QuizForm classID={classID} />

            
            <div className="quizzes">
                {quizzes && quizzes.map((quiz) => (
                    <QuizDetails key={quiz._id} quiz={quiz} classID={classID}/>
                ))}
            </div>
            

            { <div className="classrooms">
                <h3>Question Bank</h3>
                <Link to={`/` + classID + "/question-bank"}><h4>click here for questions</h4></Link>
            </div> }

            { <div className="quiz-results">
                <h3>Quiz results</h3>
                <Link to={`/` + classID + "/quiz-results"}><h4>click here for quiz results</h4></Link>
            </div> }
        </div>
         
    )
}

const assign_questions_to_quizzes = (quizzes, classID) => {
    const fetchQuestions = async () =>{
        const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
        const json = await response.json()

        if(response.ok){
            quizzes.map((quiz) => {
                if(quiz.questions==null){
                    assign_questions(quiz, json)
                }
            })
        }
    }
    fetchQuestions()
    const assign_questions = (quiz, these_questions) => {
        quiz.questions = these_questions
    }
}

export default Classroom