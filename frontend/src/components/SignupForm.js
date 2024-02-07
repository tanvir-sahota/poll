import { useState } from 'react'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {username, password}
    
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setUsername('')
      setPassword('')
      console.log('new user added:', json)
    }
  }

  return (
    <form className="sign-up" onSubmit={handleSubmit}> 
      <h3>Sign Up</h3>

      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
      />

      <button>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default SignupForm