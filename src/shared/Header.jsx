import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../app/firebase';
const Header = () => {
    var user = useSelector(state => state.usr);
    var dispatch = useDispatch();
    var navigate = useNavigate();

    const logoutUser = () => {
        signOut(auth)
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className=' bg-success sticky-top'>
            <nav className="container navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Edupoly</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {
                            !user.isLoggedIn && (<li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>)
                        }
                    </ul>
                    {user.isLoggedIn && <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                {!user.userDetails.photoURL &&
                                    <button className='profile-pic text-center' data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className='bi bi-person'></i>
                                    </button>}
                                {user.userDetails.photoURL &&
                                    <button className='profile-pic' data-bs-toggle="dropdown" style={{backgroundImage:`url(${user.userDetails.photoURL})`}} aria-expanded="false">
                                        {/* <img src={user.userDetails.photoURL} className='' alt="" /> */}
                                    </button>}
                                <ul className="dropdown-menu " >
                                    <li className="dropdown-item"><button className='btn' onClick={() => { navigate('/campaignerdashboard') }}>DashBoard</button></li>
                                    <li className="dropdown-item"><button className='btn' onClick={() => { navigate('/campaignerdashboard/registered') }}>Registered</button></li>
                                    <li className="dropdown-item"><button className='btn' onClick={() => { navigate('/campaignerdashboard/profile') }}>Profile</button></li>
                                    <li className="dropdown-item">
                                        <button onClick={logoutUser} className="btn">Logout</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>}
                </div>
            </nav>
        </div>
    )
}

export default Header