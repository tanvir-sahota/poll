import {useState} from "react";
import { useLocation } from "react-router-dom";
import HostingOptions from "../components/HostingOptions"

const HostedClassroom = () =>{
    const location = useLocation()

    const userID = location.pathname.split("/").at(2)
    const {currentClassID, currentQuestion} = location.state
    
    


    //should have some functionality where the userID has to be valid or becomes a anonymous user
    const [hostingOptions, setHostingOptions] = useState(userID == "0" ? false : true)



    return(
        <div className="home">    
            <div id="displayArea">
                <div id="answerArea">

                </div>
            </div>
            <div id="hostingOptions">
                {hostingOptions ? 
                    <HostingOptions userID = {userID} question = {currentQuestion}/>
                : null}
            </div>    
        </div>
    )
}

export default HostedClassroom