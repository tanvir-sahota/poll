import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import { useClassroomContext } from '../hooks/useClassroomContext';
import ClassroomObject from '../components/ClassroomObject'

import { Link } from 'react-router-dom'


import QuizDetails from "../components/QuizDetails"
import QuizForm from '../components/QuizForm';

const Classroom = () => {
    const classID = useLocation().pathname.split("/").at(1)
    const {quizzes, dispatch: dispatch_quiz} = useQuizzesContext()
    const {classrooms, dispatch: dispatch_classroom} = useClassroomContext()
    

    useEffect(() => {        
        const fetchQuizzes = async () => {
            const response = await fetch('/api/quizzes')
            const json = await response.json()

            if (response.ok) {
                dispatch_quiz({type: 'SET_QUIZZES', payload: json})
            }
        }
        fetchQuizzes()
    }, [dispatch_quiz])

    // useEffect(() => {
    //     const fetchClassrooms = async () => {
    //         // const response = await fetch('http://localhost:4000/api/classrooms/'+classID, {
    //         const response = await fetch('http://localhost:4000/api/classrooms/')
    //         const json = await response.json()
    
    //         if (response.ok) {
    //             dispatch_classroom({type: 'SET_CLASSROOM', payload: json})
    //         }
    //     }
    //     fetchClassrooms()   
    // }, [dispatch_classroom])

    console.log(classrooms)


    
    
    
    
    
    // let classroom_title
    // const fetchClassroom = async () => {
    //     const response = await fetch('http://localhost:4000/api/classrooms/'+classID, {
    //     // const response = await fetch('http://localhost:4000/api/classrooms/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await response.json()
    //     return json
    // }
    // fetchClassroom().then(json => {
    //     classroom_title = json
    // })
    // console.log(classroom_title)


    
    
    



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
                <Link to={"http://localhost:3000/" + classID + "/question-bank"}><h4>lolololol</h4></Link>
            </div> }

        </div>
         
    )
}

export default Classroom