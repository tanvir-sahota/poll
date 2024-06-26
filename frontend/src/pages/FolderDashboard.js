import {useEffect} from "react";
import {useFoldersContext} from "../hooks/useFoldersContext";
import FolderDetails from "../components/folder/FolderDetails"
import FolderForm from "../components/forms/FolderForm";

const FolderDashboard = () => {

    const {folders, dispatch} = useFoldersContext()
    useEffect(() => {
        const fetchFolders = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/folders`)
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_FOLDERS', payload: json})
            }
        }

        fetchFolders()
    }, [])

    return (
        <div className="folder">
            <h2>Folder</h2>
            <div className="folders">
                {folders && folders.map((folder) => (
                    <FolderDetails key={folder._id} folder={folder}/>
                ))}
            </div>
            <FolderForm/>
        </div>
    )
}
export default FolderDashboard