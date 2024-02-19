import React from 'react'
import { useGetAllCampaingsQuery } from '../../services/jsonApi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function CampaignerDashboard() {
  var {isLoading,data}=useGetAllCampaingsQuery()
  var {userDetails} = useSelector(state=>state.usr);
  console.log("user::",userDetails)
  return (
    <div className='bg-light'>
        <div className='container'>
          <div className='text-center text-danger'>
             {Object.values(userDetails).includes('') && <b>Your Profile is incomple <Link to='/editprofile'> Click here</Link>to update!</b> }
          </div>
            <h1>CampaignerDashboard</h1>
            {
              isLoading && "...Loading...."
            }
            <div className='d-flesx flex-wrap justify-content-between'>
            {
              !isLoading && data?.map((camp)=>{
                return <li>
                  <div class="card" style={{"width":"400px"}}>
                    <img class="card-img-top" src={camp.imgUrl} />
                    <div class="card-body">
                      <h4 class="card-title">{camp.title}</h4>
                      <p class="card-text">{camp.description} {`${camp.link}/${userDetails.username}/${camp.title}`}</p>
                      <input type="text" value={camp.link}></input>
                    </div>
                  </div>
                  </li>
              })
            }
            </div>
        </div>
    </div>
  )
}

export default CampaignerDashboard