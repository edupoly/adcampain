import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice';
function Header() {
    var user = useSelector(state=>state.usr);
    var dispatch = useDispatch();
    var navigate = useNavigate();

    function logoutUser(){
        dispatch(logout())
        navigate("/login")
    }
  return (
    <div className=' bg-success'>
        <nav className="container navbar navbar-expand-sm">
            <div className="container-fluid">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Edupoly</Link>
                </li>
                {
                    user.isLoggedIn &&  <li className="nav-item">
                                            <b onClick={logoutUser} className="nav-link">Logout</b>
                                        </li>
                }
                {
                    !user.isLoggedIn && (<li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>)
                }
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Header