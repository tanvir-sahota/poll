import { useEffect, useState} from "react"
import QuestionDetails from "../components/QuestionDetails"
import QuestionForm from "../components/QuestionForm"
import { useQuestionContext } from "../hooks/useQuestionContext"
import { useLocation } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const QuestionBank = () => {

    const classID = useLocation().pathname.split("/").at(1)

    const {questions, dispatch} = useQuestionContext()

    const [showQuestionForm, setShowQuestionForm] = useState(false)
    const handleCloseQuestionForm = () => setShowQuestionForm(false)
    const handleShowQuestionForm = () => setShowQuestionForm(true)


    useEffect(() => {
        const fetchQuestions = async () =>{
            const response = await fetch(`${process.env.REACT_APP_URL}api/questions/` + classID)
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_QUESTIONS", payload:json})
            }
        }

        fetchQuestions()

    }, [])

    return(
        <div className="questionBank" style={{ display: 'flex'}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="row-sm-6 mb-3" style={{textAlign:"left"}}>
                        <h2>Question Bank</h2>
                        <hr className="split"></hr>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <div className="questions">
                            {questions && questions.map(question => (
                                <QuestionDetails question = {question} key={question._id} classID = {classID} />
                            ))}
                        </div>
                    </div>
                    <div className="col-sm-6 mb-3">
                        <Button id="graphButton" onClick={handleShowQuestionForm}>Create Question</Button>
                    </div>
                </div>
            </div>
            
    
            
            <Modal show={showQuestionForm} onHide={handleCloseQuestionForm}>
                <Modal.Body>
                    <div className="closeIcon">
                        <span className="material-symbols-outlined" onClick={handleCloseQuestionForm}>Close</span>
                    </div>
                    <QuestionForm classID = {classID}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default QuestionBank


