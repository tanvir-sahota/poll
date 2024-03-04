import {useState} from "react";
import QuestionDisplay from "../components/QuestionDisplay";

const ConnectionPage = (inputData) =>{
    const {socket} = inputData

    const [showQuestion, setShowQuestion] = useState(null)


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