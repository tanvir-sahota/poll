import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import React from "react";
import QRCode from "react-qr-code"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate("/log_in")
  }

  return (
    <header>
      <div className="container navbar">
        <Link to="/">
          <h1>Poll</h1>
        </Link>
        <div className="qr-code-container">
          {user && (
            <div style={{ background: 'white', padding: '8px'}}>
              <QRCode value={`http://localhost:3000/` + user.username + "/waiting"} size={128}/>
            </div>
          )}
        </div>
      </div>
      <nav>
        {user && (
          <div>
            <span>{user.username}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to ="/log_in">Login</Link>
            <Link to ="/sign_up">Signup</Link>
          </div>
        )
        }
      </nav>
    </header>
  )
}

export default Navbar