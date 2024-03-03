import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const EnterNameForm = () => {
    const navigate = useNavigate()
    const { lecturer } = useParams()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const [usedUsernames, setUsedUsernames] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        /*let generatedUsername = '';

        if (username.trim() !== '') {
          generatedUsername = username.trim()
        } else {
          generatedUsername = generateUsername()
        }*/

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
        let count = sessionStorage.getItem('usernameCounter') || 1; // Get the counter from sessionStorage or initialize it to 1
        let newUsername = '';
      
        while (true) {
          newUsername = `guest${count}`;
          if (!usedUsernames.includes(newUsername)) {
            setUsedUsernames([...usedUsernames, newUsername]); // Update the list of used usernames
            sessionStorage.setItem('usernameCounter', parseInt(count) + 1); // Update the counter in sessionStorage
            return newUsername;
          }
          count++;
        }
    }
    
    return (
        <div>
            {!submitted ? (
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
            ) : (
                <h3>Waiting for {lecturer + "'s"} poll to be activated, {username}!</h3>
            )}
        </div>
    )
}

export default EnterNameForm