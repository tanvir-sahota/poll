import {useState} from "react";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useFoldersContext} from "../hooks/useFoldersContext";
import { useEffect } from 'react'

const QuizForm = (classID) => {
    
    
    const {dispatch} = useQuizzesContext()
    const {folders} = useFoldersContext();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [folderName, setFolderName] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    
    const classroom = classID_value(classID)


    const findFolderId = (folderName) => {
        const folder = folders.find(folder => folder.title === folderName);
        return folder ? folder._id : null;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(folderName)
        const folderId = findFolderId(folderName)
        console.log(folderId)
        
        const quiz = {title, description,folder:folderId,classroom}
        const response = await fetch('/api/quizzes', {
            method: 'POST',
            body: JSON.stringify(quiz),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setSuccess(null)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setFolderName('')
            setError(null)
            setSuccess("Successful Creation!")
            setEmptyFields([])
            console.log('new quiz added', json)
            dispatch({type: 'CREATE_QUIZ', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit} title="quiz form">
            <h3> Add a new quiz</h3>
            <label>Quiz title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder={"Input the new title"}
                />
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                placeholder={"Input the new description"}
                />
            <label>Folder:</label>
            <input
                type="text"
                onChange={(e) => setFolderName(e.target.value)}
                value={folderName}
                className={emptyFields.includes('folder') ? 'error' : ''}
                placeholder={"Input the new folder"}
                />
            <button> Add Quiz</button>
            {error && <div className={"error"}>{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    )
}

const classID_value = (classID) => {
    if(classID!=null && classID.classID!=null){
        return classID.classID
    }
    else{
        return ""
    }
}


export default QuizForm