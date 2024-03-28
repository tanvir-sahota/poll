import {useState} from "react";
import {useFoldersContext} from "../../hooks/useFoldersContext";

const FolderForm = (classID) => {
    
    
    const {dispatch} = useFoldersContext()
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [quizzes, setQuizzes] = useState([])
    
    
    const classroom = classID_value(classID)

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        
        const folder = {title, quizzes,classroom}
        const response = await fetch('/api/folders', {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setSuccess(null)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setQuizzes('')
            setError(null)
            setSuccess("Successful Creation!")
            setEmptyFields([])
            console.log('new folder added', json)
            dispatch({type: 'CREATE_FOLDER', payload: json})
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit} title="folder form" id="folderForm">
            <h3> Add a new folder</h3>
            <label>Folder title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder={"Input the new title"}
                />
            <button> Add Folder</button>
            {error && <div className={"error"}>{error}</div>}
            {success && <div className={"success"}>{success}</div>}
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


export default FolderForm