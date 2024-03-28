import {useFoldersContext} from "../../hooks/useFoldersContext";
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

const FolderDetails = ({folder, classID,onDrop,onDragOver}) => {
    const {dispatch} = useFoldersContext()
    const classID_or_emptystring = classID_value(classID)

    const navigate = useNavigate()
    
    /**
     * Handles folder delete requests
     * @returns {Promise<void>}
     */
    const handleClick = async () => {
        const response = await fetch(`${process.env.REACT_APP_URL}api/folders/`+ folder._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_FOLDER', payload: json})
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) =>{
        e.preventDefault()
        const quizId = e.dataTransfer.getData('quizId')
        onDrop(quizId, folder._id)
    }

    const navigateAway = async () => {
        navigate(`/api/folders/${folder._id}/${classID}`)
    }

    if(classID_or_emptystring==="" || classID_or_emptystring===folder.classroom){
        return (
                <div className="card"
                    onDragOver = {e => handleDragOver(e)}
                    onDrop={e => handleDrop(e)}>
                    <h4 className="cardHeading">{folder.title} </h4>
                    <div className="deleteIcons">
                        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
                    </div>
                    <br></br>
                    <br></br>
                    <Button id="folderButton" onClick={navigateAway}>Go</Button>
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

export default FolderDetails