import { useNavigate, useLocation } from "react-router-dom"

const WaitingPage = (inputData) =>{
    const navigate = useNavigate()
    const {socket} = inputData
    
    const location = useLocation()
    const userName = location.pathname.split("/").at(1)

    socket.emit("join-room", userName)

    socket.on("switch-pages", () => {
        navigate("/habram")
    })

    return(
        <div className="waiting-page">    
            <h3>Waiting for the poll to be activated</h3>
        </div>
    )
}

export default WaitingPage