import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const CampaignerDashboard = () => {
  let { userDetails, isLoggedIn } = useSelector(state => state.usr);
  const navigate = useNavigate()
  if (!isLoggedIn) {
    navigate("/login")
  }
  console.log("usrd",userDetails);
  return (
    <div className='bg-light'>

      <div className='container'>
        <div className='text-center'>
        {Object.values(userDetails).includes("")&& <b>Your Profile Seems to be Incomplete <Link to={'/campaignerdashboard/profile'}>Click Here</Link> to Update Your Profile</b>}
        </div>
        <h1>CampaignerDashboard</h1>
        <h1>Welcome:{userDetails.username}</h1>
        <button className='btn btn-outline-primary' onClick={() => { navigate('/campaignerdashboard/registered') }}>View All registered</button>
        
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default CampaignerDashboard