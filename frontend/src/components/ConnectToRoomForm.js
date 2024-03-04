import {useState} from "react";
import { useNavigate } from 'react-router-dom'

const ConnectToRoomForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //navigate("habram/0")
        window.location.href = `/${username}`
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
        <form className="join" onSubmit={handleSubmit}>
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
        </form>
    )
}

export default ConnectToRoomForm