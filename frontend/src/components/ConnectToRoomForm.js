import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"

const ConnectToRoomForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //navigate("habram/0")
        if (username !== '')
        {   
            window.location.href = `/${username}/waiting`
        }
        //need to make sure user exists before you can connect to their page
        // const response = await fetch('/api/users/' + username, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const json = await response.json()

        // if (!response.ok) {
        //     setError(json.error)
        //     setEmptyFields(json.emptyFields)
        // }
        // if (response.ok) {
        //     navigate("" + username)
        //     console.log('User exists', json)
        //}
        }
    
    return (
        /*<form className="join" onSubmit={handleSubmit}>
            <h3> Join Classroom</h3>
            <label>localhost:3000/</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="username"
                />
            <button>Connect</button>
            {error && <div className={"error"}>{error}</div>}
        </form>*/

        <div class="container h-100 w-50">
        <div class="row h-100 justify-content-center align-items-center text-center">
            <div class="col-10 col-md-8 col-lg-6">
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