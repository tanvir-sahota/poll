import {useState} from "react";
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

    socket.emit("join-room", "habram")

    socket.on("switch-pages", () => {
        navigate("/habram")
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username === '')
        {
            setUsername(generateUsername())
        }


        setSubmitted(true)
        
    }

    /*const generateUsername = () => {
        let uniqueUsername = ''
        let count = 1;
    
        do {
          uniqueUsername = `guest${count}`
          count++;
        } while (usedUsernames.includes(uniqueUsername))
    
        setUsedUsernames([...usedUsernames, uniqueUsername])
        return uniqueUsername
    }*/

    const generateUsername = () => {
        let count = sessionStorage.getItem('usernameCounter') || 1
        let newUsername = '';
      
        while (true) {
          newUsername = `guest${count}`;
          if (!usedUsernames.includes(newUsername)) {
            setUsedUsernames([...usedUsernames, newUsername])
            sessionStorage.setItem('usernameCounter', parseInt(count) + 1)
            return newUsername;
          }
          count++;
        }
    }
    
    return (
        <div>
            {!submitted ? (
            <div class="container h-100 w-50 bg-dark text-white">
                <div class="row h-100 justify-content-center align-items-center text-center">
                    <div class="col-10 col-md-8 col-lg-6">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label><h4>Introduce yourself</h4></label>
                            <div class="input-group mb-3">
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    className="form-control"
                                    placeholder="Enter name"
                                    aria-describedby="basic-addon2"
                                />
                            
                                <div class="input-group-append">
                                    <button>Continue</button>
                                    {error && <div className={"error"}>{error}</div>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            ) : (
                <h3>Waiting for {lecturer + "'s"} poll to be activated, {username}!</h3>
            )}
        </div>
    )
}

export default EnterNameForm