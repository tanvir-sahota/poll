import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import {useQuizzesContext} from "../hooks/useQuizzesContext"
import {useFoldersContext} from "../hooks/useFoldersContext"


import QuizDetails from "../components/quiz/QuizDetails"
import QuizForm from '../components/forms/QuizForm'
import FolderDetails from "../components/folder/FolderDetails"
import FolderForm from '../components/forms/FolderForm'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BackButton from '../components/buttons/BackButton'

const Classroom = () => {
    const classID = useLocation().pathname.split("/").at(1)
    const [classRoomName, setClassRoomName] = useState()
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

    const [hasQuizzes, setHasQuizzes] = useState(false)
    const [hasFolders, setHasFolders] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        const fetchClassroomName = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/classrooms/${classID}`)
            const classroomData = await response.json()
            if (response.ok) {
                setClassRoomName(classroomData.title)
            }
        }
        fetchClassroomName()
    }, [classID])

    useEffect(() => {
        const fetchQuizzes = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/quizzes`)
            const json = await response.json()

            if (response.ok) {
                dispatch_quiz({type: 'SET_QUIZZES', payload: json})
                console.log(json)
                const all_quizzes = json
                const classroom_quizzes = all_quizzes.filter((quiz) => quiz.classroom===classID)

                if(classroom_quizzes.length>0){
                    setHasQuizzes(true)
                }
                else{
                    setHasQuizzes(false)
                }

                console.log("has quizzes: " + hasQuizzes)
                
                assign_questions_to_quizzes(classroom_quizzes, classID)
            }

        }
        fetchQuizzes()
    }, [dispatch_quiz,classID, showQWF])


    useEffect(() => {
        const classroom_quizzes_without_folder = quizzes && quizzes.filter((quiz) => quiz.folder == null);
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
                const classroom_folders = all_folders.filter((folder) => folder.classroom===classID)

                if(classroom_folders.length>0) {
                    setHasFolders(true)
                }
                else{
                    setHasFolders(false)
                }
                
                assign_quizzes_to_folders(classroom_folders, classID)
            }
        }
        fetchFolders()
    }, [dispatch_folder,classID, showFolders])

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
            <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-11">
                            <h2 style={{ textAlign: 'left' }}>{classRoomName}</h2>
                        </div>
                        <div className='col-sm-1'>
                            <BackButton />
                        </div>
                        <hr className='split'></hr>
                </div>
                <div className="row">
                    <div className= "col-sm-6 mb-3">
                            <div className="row-sm-6">
                                <div className="card">
                                    <h3 className="card-title" style={{ textAlign: 'left' }}>Question Bank</h3>
                                    <Button id="graphButton" onClick={handleQuestionBankNavigation}>Access</Button>
                                </div>
                            </div>
                            <div className="row-sm-6">
                                <div className="card">
                                    <h3 className="card-title" style={{ textAlign: 'left' }}>Quizzes and Folders</h3>
                                    <Button id="graphButton" onClick={handleShowQWF}>Quizzes</Button>
                                    <Button id="graphButton" onClick={handleShowFolders}>Folders</Button>
                                </div> 
                            </div>
                        </div>
                        <div className= "col-sm-6 mb-3">
                            <div className="row-sm-6">
                                <div className="card">
                                    <h3 className="card-title" style={{ textAlign: 'left' }}>Quiz Results</h3>
                                    <Button id="graphButton" onClick={handleQuizResultNavigation}>Access</Button>
                                </div>
                            </div>
                            <div className="row-sm-6">
                                <div className="card">
                                    <h3 className="card-title" style={{ textAlign: 'left' }}>Creation</h3>
                                    <Button id="graphButton" onClick={handleShowQuizForm}>Create Quiz</Button>
                                    <Button id="graphButton" onClick={handleShowFolderForm}>Create Folder</Button>    
                                </div> 
                            </div>
                        </div>
                    </div>
                
            <Modal show={showQWF} onHide={handleCloseQWF}>
                <Modal.Body>
                    <div className="quizModal">
                        <h3>Quizzes</h3>
                        <div className="closeIcon">
                            <span className="material-symbols-outlined" onClick={handleCloseQWF}>Close</span>
                        </div>
                        {quizzes_without_folder && hasQuizzes && quizzes_without_folder.map((quiz) => (
                            <QuizDetails key={quiz._id} quiz={quiz} classID={classID} onDragStart={handleDragStart}/>
                        ))}
                        {!quizzes_without_folder || (quizzes_without_folder && !hasQuizzes) ? (
                            <h6>You have no quizzes that have no folders.</h6>
                        ) : null}
                    </div>
                </Modal.Body>
            </Modal>
            </div>
            <Modal show={showFolders} onHide={handleCloseFolders}>
                <Modal.Body>
                    <div className="folders">
                    <h3>Folders</h3>
                    <div className="closeIcon">
                        <span className="material-symbols-outlined" onClick={handleCloseFolders}>Close</span>
                    </div>
                        {folders && hasFolders && folders.map((folder) => (
                            <FolderDetails key={folder._id} folder={folder} classID={classID}
                            onDragOver={handleDragOver} onDrop={handleDrop}/>
                        ))}
                        {!folders || (folders && !hasFolders) ? (
                            <h6>You have no folders.</h6>
                        ) : null}
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showQuizForm} onHide={handleCloseQuizForm}>
                <Modal.Body>
                    <div className="closeIcon">
                        <span className="material-symbols-outlined" onClick={handleCloseQuizForm}>Close</span>
                    </div>
                    <QuizForm classID={classID}/>
                </Modal.Body>
            </Modal>

            <Modal show={showFolderForm} onHide={handleCloseFolderForm}>
                <Modal.Body>
                    <div className="closeIcon">
                        <span className="material-symbols-outlined" onClick={handleCloseFolderForm}>Close</span>
                    </div>
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