import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Poll</h1>
        </Link>
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