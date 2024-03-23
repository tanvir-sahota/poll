import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useFoldersContext} from "../hooks/useFoldersContext";


import QuizDetails from "../components/QuizDetails"
import QuizForm from '../components/QuizForm';
import FolderDetails from "../components/FolderDetails"
import FolderForm from '../components/FolderForm';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Classroom = () => {
    const classID = useLocation().pathname.split("/").at(1)
    const [quizzes_without_folder,set_qwf] = useState([]);
    const {quizzes, dispatch: dispatch_quiz} = useQuizzesContext()
    const {folders, dispatch: dispatch_folder} = useFoldersContext()


    const [showQWF, setShowQWF] = useState(false)
    const handleCloseQWF = () => setShowQWF(false)
    const handleShowQWF = () => setShowQWF(true)

    const [showFolders, setShowFolders] = useState(false)
    const handleCloseFolders = () => setShowFolders(false)
    const handleShowFolders = () => setShowFolders(true)

    const [showQuizForm, setShowQuizForm] = useState(false)
    const handleCloseQuizForm = () => setShowQuizForm(false)
    const handleShowQuizForm = () => setShowQuizForm(true)

    const [showFolderForm, setShowFolderForm] = useState(false)
    const handleCloseFolderForm = () => setShowFolderForm(false)
    const handleShowFolderForm = () => setShowFolderForm(true)

    const navigate = useNavigate()


    useEffect(() => {        
        const fetchQuizzes = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes`)
            const json = await response.json()


            if (response.ok) {
                dispatch_quiz({type: 'SET_QUIZZES', payload: json})
                console.log(json)
                const all_quizzes = json
                const classroom_quizzes = all_quizzes.filter((quiz) => quiz.classroom==classID)
                assign_questions_to_quizzes(classroom_quizzes, classID)
            }

        }
        fetchQuizzes()
    }, [dispatch_quiz,classID])


    useEffect(() => {
        const classroom_quizzes_without_folder = quizzes && quizzes.filter((quiz) => quiz.folder === null);
        set_qwf(classroom_quizzes_without_folder);
        assign_questions_to_quizzes(classroom_quizzes_without_folder,classID)
    }, [quizzes]);

    useEffect(() => {
        const fetchFolders = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/folders`)
            const json = await response.json()

            if (response.ok) {
                dispatch_folder({type: 'SET_FOLDERS', payload: json})
                const all_folders = json
                const classroom_folders = all_folders.filter((folder) => folder.classroom==classID)
                assign_quizzes_to_folders(classroom_folders, classID)
            }
        }
        fetchFolders()
    }, [dispatch_folder,classID])

    const handleDragStart = (e, quizId) => {
        e.dataTransfer.setData('quizId', quizId);
    };

    const handleDrop = async (quizId, folderId) => {

        try {
            const response = await fetch(`/api/quizzes/${quizId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ folder: folderId }),
            });
            const json = await response.json()
            json.folder = folderId

            if (!response.ok) {
                throw new Error('Failed to move quiz to folder');
            }else{
                console.log(json)
                dispatch_quiz({ type: 'UPDATE_QUIZ', payload: json });
            }

        } catch (error) {
            console.error('Error moving quiz to folder:', error);
        }


    };

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleQuestionBankNavigation = () => {
        navigate(`/${classID}/question-bank`)
    }

    const handleQuizResultNavigation = () => {
        navigate(`/${classID}/quiz-results`)
    }
    return (
        <div className="classroom" style={{ display: 'flex', alignItems: 'center' }}>
            <div class="container">
                <div class="row">
                    <div class= "row-sm-6 mb-3">
                        <div className="row-sm-6">
                            <h2>Classroom</h2>
                        </div>
                        <hr className='split'></hr>
                    </div>
                    <div class= "col-sm-5 mb-3">
                        {/* <div className="row-sm-6">
                            <h2>Classroom</h2>
                        </div> */}
                        <div className="row-sm-6">
                            <div class="card">
                                <h3 class="card-title">Question Bank</h3>
                                <Button id="graphButton" onClick={handleQuestionBankNavigation}>Access</Button>
                            </div>
                        </div>
                        <div className="row-sm-6">
                            <div class="card">
                                <h3 class="card-title">Quizzes and Folders</h3>
                                <Button id="graphButton" onClick={handleShowQWF}>Quizzes</Button>
                                <Button id="graphButton" onClick={handleShowFolders}>Folders</Button>
                            </div> 
                        </div>
                    </div>
                    <div class= "col-sm-5 mb-3">
                        {/* <div className="row-sm-6">
                            <h2>Classroom</h2>
                        </div> */}
                        <div className="row-sm-6">
                            <div class="card">
                                <h3 class="card-title">Quiz Results</h3>
                                <Button id="graphButton" onClick={handleQuizResultNavigation}>Access</Button>
                            </div>
                        </div>
                        <div className="row-sm-6">
                            <div class="card">
                                <h3 class="card-title">Creation</h3>
                                <Button id="createButton" onClick={handleShowQuizForm}>Create Quiz</Button>
                                <Button id="createButton" onClick={handleShowFolderForm}>Create Folder</Button>    
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="row">
            </div>



            <Modal show={showQWF} onHide={handleCloseQWF}>
                <Modal.Body>
                    <div className="quizzes">
                        {quizzes_without_folder && quizzes_without_folder.map((quiz) => (
                            <QuizDetails key={quiz._id} quiz={quiz} classID={classID} onDragStart={handleDragStart}/>
                            ))}
                    </div>
                </Modal.Body>
            </Modal>
            </div>
            <Modal show={showFolders} onHide={handleCloseFolders}>
                <Modal.Body>
                    <div className="folders">
                        {folders && folders.map((folder) => (
                            <FolderDetails key={folder._id} folder={folder} classID={classID}
                            onDragOver={handleDragOver} onDrop={handleDrop}/>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showQuizForm} onHide={handleCloseQuizForm}>
                <Modal.Body>
                    <QuizForm classID={classID}/>
                </Modal.Body>
            </Modal>

            <Modal show={showFolderForm} onHide={handleCloseFolderForm}>
                <Modal.Body>
                    <FolderForm classID={classID}/>
                </Modal.Body>
            </Modal>
        </div>
         
    )
}


const assign_questions_to_quizzes = (quizzes, classID) => {
    const fetchQuestions = async () =>{
        const response = await fetch(`${process.env.REACT_APP_URL}api/questions/`+ classID)
        const json = await response.json()

        if(response.ok){
            quizzes&&quizzes.map((quiz) => {
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