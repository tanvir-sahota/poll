import {useState} from "react";
import { useLocation } from "react-router-dom";
import HostingOptions from "../components/HostingOptions"

const HostedClassroom = (inputData) =>{
    const {socket} = inputData
    const location = useLocation()
    const userName = location.pathname.split("/").at(1)
    const currentClassID = location.state.currentClassID
    const currentQ = location.state.currentQuestion
    // const id = currentQuestion._id

    //should have some functionality where the userID has to be valid or becomes a anonymous user
    const [hostingOptions, setHostingOptions] = useState(true)

    socket.emit("host", userName)
    //This will change to be inside dashboard so that when the lecturer logs in then auto joins room
    socket.emit("join-room", userName)

    return(
        <div id="hostingOptions">
            {hostingOptions ? 
                <HostingOptions socket = {socket} userName = {userName} question = {currentQ} classID = {currentClassID}/>
            : null}
        </div>    
    )
}

export default HostedClassroom