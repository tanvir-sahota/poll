import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";


const EnterNameForm = (inputData) => {
    const {socket} = inputData
    const navigate = useNavigate()
    const { lecturer } = useParams()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [usedUsernames, setUsedUsernames] = useState([])
    const [isHosting, setHosted] = useState(false)

    useEffect(() => {
        socket.emit("join-room", lecturer)
    }, [])

    socket.emit("check-hosting-status", lecturer, (response) => {
        setHosted(response.isHosting)
    })

    socket.on("switch-pages", () => {
        if(submitted) {switchPages()}
        setHosted(true)
    })

    socket.on("disconnect-handler", () => {
        setHosted(false)
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username === '')
        {
            setUsername(generateUsername())
        }


        setSubmitted(true)

    }

    const switchPages = () => {
        navigate("/" + lecturer)
    }

    const generateUsername = () => {
        let count = sessionStorage.getItem('usernameCounter') || Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        let newUsername = '';

        while (true) {
            newUsername = `guest${count}`;
            if (!usedUsernames.includes(newUsername)) {
                setUsedUsernames([...usedUsernames, newUsername])
                sessionStorage.setItem('usernameCounter', Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000)
                return newUsername;
            }
            count++;
        }
    }

    return (
        <div>
            {!submitted ? (
            <div className="justify-content-between align-items-center text-center">
                <h3>Welcome to {lecturer + "'s"} poll!</h3>
                <div className="container h-100 w-80">
                    <div className="row h-100 justify-content-center align-items-center text-center">
                        <div className="col-10 col-md-8 col-lg-6">
                            <form className="form-group" onSubmit={handleSubmit}>
                                <label className="mt-4"><h4>Introduce yourself</h4></label>
                                <div className="input-group mb-3 mt-3">
                                    <input
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        className="form-control"
                                        placeholder="Enter name (optional)"
                                        aria-describedby="basic-addon2"
                                    />
                                
                                    <div className="input-group-append">
                                        <button>Continue</button>
                                        {error && <div className={"error"}>{error}</div>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div>
                    {isHosting ? switchPages() :
                        <h3 className="align-items-center text-center">Waiting for {lecturer + "'s"} poll to be activated, {username}!</h3>
                    }
                </div>
            )}
        </div>
    )
}

export default EnterNameForm