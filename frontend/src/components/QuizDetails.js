import { Link, useNavigate } from "react-router-dom";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import { useState } from "react";
import Button from 'react-bootstrap/Button'


const QuizDetails = ({quiz, classID}) => {
    const {dispatch} = useQuizzesContext()
    const classID_or_emptystring = classID_value(classID)
    const navigate = useNavigate()

    /**
     * Handles quiz delete requests
     * @returns {Promise<void>}
     */
    const handleClick = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes/`+ quiz._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_QUIZ', payload: json})
        }
    }

    const navigateAway = async () => {
        navigate(`/api/quizzes/${quiz._id}/${classID}`)
    }


    const handleDragStart = (e) => {
        console.log(quiz._id)
        e.dataTransfer.setData('quizId', quiz._id)
    }

        if(classID_or_emptystring=="" || classID_or_emptystring==quiz.classroom){
            return (
                <div className="card" 
                     draggable = "true" 
                     onDragStart = {e => handleDragStart(e)}>
                    <h4 className="cardHeading">{quiz.title} </h4>
                    <p><strong>Description: </strong> {quiz.description}</p>
                    <div className="deleteIcons">
                        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
                    </div>
                    <br></br>
                    <Button id="quizButton" onClick={navigateAway}>Go</Button>

    
                </div>
            )
        }
    }

const classID_value = (classID) => {
    if(classID!=null){
        return classID
    }
    else{
        return ""
    }
}

export default QuizDetails