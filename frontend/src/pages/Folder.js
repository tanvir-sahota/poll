import {useFoldersContext} from "../hooks/useFoldersContext";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useParams, useRouteError} from "react-router-dom";
import {useEffect, useState} from "react";
import QuizDetails from "../components/quiz/QuizDetails"
import BackButton from "../components/buttons/BackButton";

const Folder = () => {
    const {folder,dispatch:dispatch_folder} = useFoldersContext()
    const {quizzes,dispatch:dispatch_quiz} = useQuizzesContext()
     const [error, setError] = useState(null)
    const {folder_id, classroom_id} = useParams()

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
    <div className="folder" style={{ display: 'flex'}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-11" style={{textAlign:"left"}}>
                    <h2>{folder.title}</h2>
                </div>
                <div className="col-sm-1">
                    <BackButton />
                </div>
                <hr className="split"></hr>
            </div>
            <div className="row">
                <div className="col-sm-6 mb-3">
                    <div className="quizzes">
                        {quizzes&&quizzes.map((quiz) => (
                            <QuizDetails key={quiz._id} quiz={quiz} classID={classroom_id}/>
                        ))}
                   </div>
                </div>
            </div>
            <div className="row-sm-6 mb-3">
                {error && <div className={"error"}>{error}</div>}
            </div>     
        </div>
    </div>
    )
}
export default Folder