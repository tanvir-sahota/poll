import {useFoldersContext} from "../hooks/useFoldersContext";
import {useParams, useRouteError} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectQuizzesForm from "../components/SelectQuizForm";

import ShowSelectQuiz from "../components/ShowSelectQuiz"

const Folder = () => {

    const {folder,dispatch} = useFoldersContext()
     const [error, setError] = useState(null)

    const {folder_id, classroom_id} = useParams()
    

    // Fires once when the component first renders
    useEffect(() => {

        const fetchFolder = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/folders/` + folder_id, {method: 'GET'})
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_FOLDER', payload: json})
            }
            else{
                setError(json.error)
            }
        }
        fetchFolder()
    }, [])


    if (folder==null) {
        return <h2>"Still loading..."</h2>
    }
    return (
        <div className="folder">
            <h2>Folder</h2>
            <br/>
            <br/>
            <div className="folders">
                <h3>{folder.title}</h3>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>


            <ShowSelectQuiz classroom_id={classroom_id} folder_id={folder_id} />
            
            

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default Folder