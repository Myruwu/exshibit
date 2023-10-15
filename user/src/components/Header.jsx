import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTicketAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src="/logo.png" alt="" className='logo-icon'/>
        UPang HelpDesk
      </Link>
      <ul>
        {user ? (
          <>
          <li>
            {user.name}
          </li>
          <li>
            <img src="https://zultimate.com/wp-content/uploads/2019/12/default-profile.png" className='profile-pic' alt='profile-pic'/>
          </li>
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
