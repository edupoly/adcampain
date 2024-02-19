import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className='bg-light admindb'>
      <div className='container  '>
        <div className='w-50 text-center  shadow rounded p-5'>
          <h1 className='adminhead'>Admin Dashboard</h1>
          <div>
            <Link className='btn btn-warning m-2' to="/createCampaign">+ Create Campaign</Link>
          </div>
          <div>
            <Link className='btn btn-primary m-2' to="/allCampaignes">+ View All Campaign</Link>
          </div>
          <div>
            <Link className='btn btn-danger m-2' to="/allregistered">All Registered Details</Link>
          </div>
          <div>
            <Link className='btn btn-success m-2' to="/allcampaigner">All Campaigner Details</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard