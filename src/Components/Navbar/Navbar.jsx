import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import {useNavigate} from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
  // Get User from LocalStorage
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)

  //Navigate
  const navigate = useNavigate()

  //logout function
  const logout = ()=>{
       localStorage.clear('user')
       navigate('/login')
  }
  const cartItems = useSelector((state)=>state.cart)
  const navList =(
    <ul className='nav-list'>
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {/* Signup */}
           {!user ?  <li>
                <Link to={'/signup'}>Signup</Link>
            </li>:""}
            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}
            {/* User */}
           {user?.role ==="user" && <li>
                <Link to={'/user-dashboard'}>{user?.name}</Link>
            </li>}
            {/* Admin */}
           {user?.role ==="admin" && <li>
              <Link to={'/admin-dashboard'}>{user?.name}</Link>
            </li>}
            {/* logout */}
            {user && <li onClick={logout} className='logout'>logout</li>}
            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                  cart({cartItems.length})
                </Link>
            </li>
        </ul>
  )
  return (
    <nav>
      <div className='nav-container'>
        <div className='nav-left'>
          <Link to={'/'}>
          <h2>E-CommerceExpress</h2>
          </Link>
        </div>
        <div className='nav-right'>
           {navList}
        </div>

        <SearchBar/>
      </div>
    </nav>
  )
}

export default Navbar