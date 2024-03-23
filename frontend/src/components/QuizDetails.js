import { Link } from "react-router-dom";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import { useState } from "react";

const QuizDetails = ({quiz, classID}) => {
    const {dispatch} = useQuizzesContext()
    const classID_or_emptystring = classID_value(classID)

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


    const handleDragStart = (e) => {
        console.log(quiz._id)
        e.dataTransfer.setData('quizId', quiz._id)
    }

        if(classID_or_emptystring=="" || classID_or_emptystring==quiz.classroom){
            return (
                <div className="quiz-details" 
                     draggable = "true" 
                     onDragStart = {e => handleDragStart(e)}
                     style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                    <h4>{quiz.title} </h4>
                    <p><strong>Description: </strong> {quiz.description}</p>
                    <span onClick={handleClick}>delete</span>
                    <Link to={"http://localhost:3000/api/quizzes/" + quiz._id + "/" + classID}><h4>"Go to this quizzes page"</h4></Link>
                    <br></br>
                    <br></br>
                    <br></br>
    
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