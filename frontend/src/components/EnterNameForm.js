import {useState} from "react";
import { useNavigate } from 'react-router-dom'


const EnterNameForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        navigate("/habram/waiting")
        }
    
    return (
        <form className="join" onSubmit={handleSubmit}>
            <label>Introduce yourself</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="Enter name"
                />
            <button>Continue</button>
            {error && <div className={"error"}>{error}</div>}
        </form>
    )
}

export default EnterNameForm