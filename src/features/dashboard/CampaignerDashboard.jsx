import React from 'react'
import { useGetAllCampaingsQuery } from '../../services/jsonApi'
import { useSelector } from 'react-redux'

function CampaignerDashboard() {
  var {isLoading,data}=useGetAllCampaingsQuery()
  var {userDetails} = useSelector(state=>state.usr);
  // console.log("user::",user)
  return (
    <div className='bg-light'>
        <div className='container'>
            <h1>CampaignerDashboard</h1>
            {
              isLoading && "...Loading...."
            }
            {
              !isLoading && data?.map((camp)=>{
                return <li>
                  <div class="card" style={{"width":"400px"}}>
                    <img class="card-img-top" src={camp.imgUrl} />
                    <div class="card-body">
                      <h4 class="card-title">{camp.title}</h4>
                      <p class="card-text">{camp.description} {`${camp.link}/${userDetails.username}`}</p>
                      <input type="text" value={camp.link}></input>
                    </div>
                  </div>
                  </li>
              })
            }
        </div>
    </div>
  )
}

export default CampaignerDashboard