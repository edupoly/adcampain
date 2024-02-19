import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice';
function Header() {
    var user = useSelector(state => state.usr);
    console.log(user);
    var dispatch = useDispatch();
    var navigate = useNavigate();

    function logoutUser() {
        dispatch(logout())
        navigate("/login")
    }
    return (
        <div className=' bg-success'>
            <nav className="container navbar navbar-expand-sm">
                <div className="container-fluid">
                    <ul className="navbar-nav ">

                        <li className="nav-item">
                            <Link to="/" className="nav-link">Edupoly</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admindashboard" className="nav-link">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/campaignerdashboard" className="nav-link">Campaigner DashBoard</Link>
                        </li>
                    </ul>

                    <ul className='navbar-nav ms-auto'>
                        <div class="dropdown">
                            <button class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                           {user.userDetails.photoUrl && <img src={user.userDetails.photoUrl} width='30px' height='30px' style={{borderRadius:'50%',border:'1px solid'}} />}
                           {!user.userDetails.photoUrl && <i class="bi bi-person-circle"></i>}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link class="dropdown-item" to="/profile">Profile</Link></li>

                                <li><Link class="dropdown-item" to="/">Admin Dashboard</Link></li>
                                <li><Link class="dropdown-item" to="/">Campaigner Dashboard</Link></li>
                            </ul>
                        </div>



                        {
                            user.isLoggedIn && <li className="nav-item">
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