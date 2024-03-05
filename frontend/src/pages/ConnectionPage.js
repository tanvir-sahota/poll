import {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionDisplay from "../components/QuestionDisplay";

const ConnectionPage = (inputData) =>{
    const {socket} = inputData

    const userName = useLocation().pathname.split("/").at(1)
    const navigate = useNavigate()
    //const userName = location.state.room
    const [showQuestion, setShowQuestion] = useState(null)

    useEffect(() => {
        socket.emit("join-room", userName)
        socket.emit("connect-to-room", userName)
    }, [])
    //console.log("Lets see")

    socket.on("disconnect-handler", () => {
        navigate("/habram/waiting")
    })

    socket.on("display-question", question => {
        setShowQuestion(<QuestionDisplay givenQuestion = {question} isAdmin={false} socket={socket}/>)
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