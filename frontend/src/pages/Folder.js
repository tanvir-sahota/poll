import {useFoldersContext} from "../hooks/useFoldersContext";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useParams, useRouteError} from "react-router-dom";
import {useEffect, useState} from "react";
import QuizDetails from "../components/QuizDetails"

const Folder = () => {
    const {folder,dispatch:dispatch_folder} = useFoldersContext()
    const {quizzes,dispatch:dispatch_quiz} = useQuizzesContext()
     const [error, setError] = useState(null)
    const {folder_id, classroom_id} = useParams()
    
    console.log(folder)
    console.log(quizzes)
    // Fires once when the component first renders
    useEffect(() => {

        const fetchFolder = async () => {
            const response = await fetch(`${process.env.REACT_APP_URL}api/folders/` + folder_id, {method: 'GET'})
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                dispatch_folder({type: 'SET_FOLDER', payload: json})
            }
            else{
                setError(json.error)
            }
        }
        fetchFolder()
    }, [dispatch_folder,folder_id])

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`/api/folders/${folder_id}/quizzes`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                dispatch_quiz({type: 'SET_QUIZZES', payload: data})
            } catch (error) {
                setError(error.message);
            }
            
        };

        fetchQuizzes();
    }, [dispatch_quiz]); 



    if (folder==null) {
        return <h2>"Still loading..."</h2>
    }
    return (
        <div className="folder">
            <br/>
            <br/>
            <div className="folders">
                <h2>{folder.title}</h2>
            </div>
                 <div className="quizzes">
                {quizzes&&quizzes.map((quiz) => (
                    <QuizDetails key={quiz._id} quiz={quiz} classID={classroom_id}/>
                ))}
            </div>

            <br/>
            <br/>
            
            

            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}


export default Folder