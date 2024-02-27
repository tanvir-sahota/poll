import {useState} from "react";
import { useLocation } from "react-router-dom";
import HostingOptions from "../components/HostingOptions"

const HostedClassroom = () =>{
    const userID = useLocation().pathname.split("/").at(2)



    //should have some functionality where the userID has to be valid or becomes a anonymous user
    const [hostingOptions, setHostingOptions] = useState(userID == "0" ? false : true)



    return(
        <div className="home">    
            <div id="displayArea">

            </div>
            <div id="answerArea">

            </div>
            <div id="hostingOptions">
                {hostingOptions ? 
                    <HostingOptions userID = {userID}/>
                : null}
            </div>    
        </div>
    )
}

export default HostedClassroom