import React from "react";
import { useGetAllCampaingsQuery } from '../../services/jsonApi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

const AllCampaigns = () => {
  let { isLoading, data } = useGetAllCampaingsQuery()
  let { userDetails, isLoggedIn } = useSelector(state => state.usr);
  const navigate = useNavigate()
  if (!isLoggedIn) {
    navigate("/login")
  }
  const CopyAndNavigate = (e, camp) => {
    console.log("value", e);
    navigate(`/adRegistration/${userDetails.username}/${camp.title}`)
    let link = new Blob([e], { type: "text/plain" })
    navigator.clipboard.write([
      new ClipboardItem({
        [link.type]: link
      })
    ])
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li key={1} className="breadcrumb-item" aria-current="page"><Link to={`/`}>Home</Link></li>
          <li key={2} className="breadcrumb-item active" aria-current="page"><Link to={`/campaignerdashboard`}>DashBoard</Link></li>
        </ol>
      </nav>
      {
        isLoading && "...Loading...."
      }
      <div className='d-flex flex-wrap justify-content-around'>
        {
          !isLoading && data?.map((camp) => {
            // console.log(camp.link);
            return <li key={camp.id} className='camp-card m-2'>
              <div className="card w-100">
                <img className="card-img-top" src={camp.imgUrl} />
                <div className="card-body">
                  <h4 className="card-title">{camp.title}</h4>
                  <p className="card-text">{camp.description}</p>
                  <p>{`${camp.link}/${userDetails.username}/${camp.title}`}</p>
                </div>
                <div className='card-bottom text-center'>
                  <button className='btn btn-outline-primary' onClick={(e) => { CopyAndNavigate(e.target.value, camp) }} value={`${camp.link}/${userDetails.username}/${camp.title}`}>Copy Link</button>
                  <button className='btn btn-outline-success' onClick={() => { navigate(`/campaignerdashboard/registered/${camp.title}`) }}>View Registrations</button>
                </div>
              </div>
            </li>
          })
        }
      </div>
    </div>
  )
}

export default AllCampaigns