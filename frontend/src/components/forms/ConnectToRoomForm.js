import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"

const ConnectToRoomForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const isUser = async (username) =>{
        const response = await fetch(`${process.env.REACT_APP_URL}api/users/${username}`)

        if(response.ok){
            return true
        }
        else{
            return false
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (username !== '')
        {   
            const foundUser = await isUser(username)
            if(foundUser){
                setError(null)
                navigate(`/${username}/waiting`)
            }
            else{
                setError("Lecturer doesn't exist")
            }
        }
        else{
            setError("Lecturer username not inputted")
        }
    }
    
    return (
        <div className="container h-100 w-80">
        <div className="row h-100 justify-content-center align-items-center text-center">
            <div className="col-10 col-md-8 col-lg-6 col-auto">
                <form className="form-group" onSubmit={handleSubmit}>
                    <label className="mt-4"><h2>Join Poll</h2></label>
                    <div className="input-group mb-3 mt-3">
                        <input
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className="form-control"
                            placeholder="Enter username"
                            aria-describedby="basic-addon2"
                            btn-focus-outline="none"
                            
                        />
                    
                        <div className="input-group-append">
                            <button>Connect</button>
                            {error && <div className={"error"}>{error}</div>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ConnectToRoomForm