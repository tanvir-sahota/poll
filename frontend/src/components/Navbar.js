import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/dashboard">
          <h1>Poll</h1>
        </Link>
      </div>
      <nav>
        <div>
          <button onClick={handleClick}>Log out</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar