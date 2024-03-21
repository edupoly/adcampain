import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className='bg-light'>
        <div className='container'>
            <h1>Admin Dashboard</h1>
            <Link className='btn btn-success' to="/createCampaign">+ Create New Loan</Link>
        </div>
    </div>
  )
}

export default AdminDashboard