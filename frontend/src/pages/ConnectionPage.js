import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionDisplay from "../components/QuestionDisplay";

const ConnectionPage = (inputData) =>{
    const {socket} = inputData
    const { lecturer } = useParams()
    const navigate = useNavigate()
    const [showQuestion, setShowQuestion] = useState(null)

    const updateQuestion = (question) => {
        setShowQuestion(<QuestionDisplay givenQuestion = {question} isAdmin={false} socket={socket} lecturer={lecturer}/>)
    }

    const navigateAway = () => {
        console.log("Navigating away")
        navigate("/"+ lecturer +"/waiting")
    }

    useEffect(() => {
        socket.emit("join-room", lecturer)
        socket.emit("connect-to-room", lecturer, (response) => {
            console.log(response.question)
            if(response.question != null){
                updateQuestion(response.question)
            }
            else{
                navigateAway()
            }
        })
    }, [])

    socket.on("disconnect-handler", () => {
        navigateAway()
    })

    socket.on("display-question", question => {
        updateQuestion(question)
    })

    return(
        <div className="home">    
            <div id="mainArea">
                <div id = "displayArea">
                    {showQuestion}
                </div>
            </div>
        </div>
    )
}

export default ConnectionPage