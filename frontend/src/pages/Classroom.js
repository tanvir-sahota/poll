import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useFoldersContext} from "../hooks/useFoldersContext";

import { Link } from 'react-router-dom'


import QuizDetails from "../components/QuizDetails"
import QuizForm from '../components/QuizForm';
import FolderDetails from "../components/FolderDetails"
import FolderForm from '../components/FolderForm';

const Classroom = () => {
    const classID = useLocation().pathname.split("/").at(1)
    const {quizzes, dispatch: dispatch_quiz} = useQuizzesContext() 
    const {folders, dispatch: dispatch_folder} = useFoldersContext()
     

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

    useEffect(() => {        
        const fetchFolders = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/folders`)
            console.log(response)
            const json = await response.json()

            if (response.ok) {
                dispatch_folder({type: 'SET_FOLDERS', payload: json})
                const all_folders = json
                const classroom_folders = all_folders.filter((folder) => folder.classroom==classID)                
                assign_quizzes_to_folders(classroom_folders, classID)
            }
        }
        fetchFolders().then()
    }, [dispatch_folder])

    return (
        <div className="dashboard">
            
            <h2>Classroom</h2>
            <QuizForm classID={classID} />
            <div className="quizzes">
                {quizzes && quizzes.map((quiz) => (
                    <QuizDetails key={quiz._id} quiz={quiz} classID={classID} hasFolder = {quiz.folder}/>
                ))}
            </div>

            <FolderForm classID={classID} />
            <div className="folders">
                {folders && folders.map((folder) => (
                    <FolderDetails key={folder._id} folder={folder} classID={classID}/>
                ))}
            </div>
            { <div className="classrooms">
                <h3>Question Bank</h3>
                <Link to={`${process.env.REACT_APP_URL}` + classID + "/question-bank"}><h4>click here for questions</h4></Link>
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
            console.log(quizzes)
        }
    }
    fetchQuestions()
    const assign_questions = (quiz, these_questions) => {
        quiz.questions = these_questions
    }
}

const assign_quizzes_to_folders = (folders, classID) => {
    const fetchQuizzes = async () =>{
        const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes/`)
        const json = await response.json()

        if(response.ok){
            folders.map((folder) => {
                if(folder.quizzes==null){
                    assign_quizzes(folder, json)
                }
            })
            console.log(folders)
        }
    }
    fetchQuizzes()
    const assign_quizzes = (folder, these_quizzes) => {
        folder.quizzes = these_quizzes
    }
}

export default Classroom