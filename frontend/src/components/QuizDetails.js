import { useNavigate } from "react-router-dom";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useQuizResultContext} from "../hooks/useQuizResultContext";
import Button from 'react-bootstrap/Button'


const QuizDetails = ({quiz, classID}) => {
    const {dispatch: dispatchQ} = useQuizzesContext()
    const {dispatch: dispatchQR} = useQuizResultContext()
    const classID_or_emptystring = classID_value(classID)
    const navigate = useNavigate()

    /**
     * Handles quiz delete requests
     * @returns {Promise<void>}
     */
    const handleClick = async () => {
        const deleteQuiz = await fetch(`${process.env.REACT_APP_URL}api/quizzes/`+ quiz._id, {method: 'DELETE'})
        const jsonQ = await deleteQuiz.json()

        if (deleteQuiz.ok) {
            dispatchQ({type: 'DELETE_QUIZ', payload: jsonQ})
        }

    }

    const navigateAway = async () => {
        navigate(`/api/quizzes/${quiz._id}/${classID}`)
    }


    const handleDragStart = (e) => {
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

const get_quiz_results = async (quiz, classID) => {
    const allClassroomQuizResults = await fetch(`${process.env.REACT_APP_URL}api/quiz-results/` + classID, {method: 'GET'})
    const jsonCQR = await allClassroomQuizResults.json()
    if(allClassroomQuizResults.ok){
        for(let i=0; i<jsonCQR.length; i++){
            if(jsonCQR[i].quiz == quiz._id){
                return jsonCQR[i]
            }
        }
    }
}

export default QuizDetails