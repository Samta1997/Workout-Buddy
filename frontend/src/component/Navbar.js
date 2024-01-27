import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const {logout}=useLogout()
  const {user}=useAuthContext()

  const handler=()=>{
    logout()
  }
  return (
    <header>
        <div className='container'>
            <Link to='/'>
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              {user &&(
                <div>
                  <span>{user.email}</span>
                  <button onClick={handler}>Log out</button>
                </div>
              )}
              {!user && (
                <div>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </div>
              )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar