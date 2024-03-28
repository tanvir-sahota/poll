import {useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import HostingOptions from "../components/hosting/HostingOptions"

const HostedClassroom = (inputData) =>{
    const {socket} = inputData
    const location = useLocation()
    const {lecturer} = useParams()
    const currentClassID = location.state.currentClassID
    const currentQ = location.state.currentQuestion
    const [hostingOptions, setHostingOptions] = useState(true)

    socket.emit("host", lecturer)
    socket.emit("join-room", lecturer)

    return(
        <div id="hostingOptions">
            {hostingOptions ? 
                <HostingOptions socket = {socket} lecturer = {lecturer} question = {currentQ} classID = {currentClassID}/>
            : null}
        </div>    
    )
}

export default HostedClassroom