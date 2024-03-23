import { Link } from "react-router-dom";
import {useFoldersContext} from "../hooks/useFoldersContext";

const FolderDetails = ({folder, classID,onDrop,onDragOver}) => {
    const {dispatch} = useFoldersContext()
    const classID_or_emptystring = classID_value(classID)


    
    
    
    
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
        // e.target.appendChild(document.getElementById(quizId))
    }

    if(classID_or_emptystring=="" || classID_or_emptystring==folder.classroom){
        return (
            <div className="folder-details"
                 onDragOver = {e => handleDragOver(e)}
                 onDrop={e => handleDrop(e)}
                 style={{ border: '1px dashed black', margin: '5px', padding: '5px' }}>
                <h4>{folder.title} </h4>
                <span onClick={handleClick}>delete</span>
                <Link to={"http://localhost:3000/api/folders/" + folder._id + "/" + classID}><h4>"Go to this folder"</h4></Link>
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

export default FolderDetails