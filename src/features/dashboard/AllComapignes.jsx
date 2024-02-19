import React from "react";
import { useGetAllCampaingsQuery } from "../../services/jsonApi";
import { useNavigate } from "react-router-dom";


function AllCampaignes() {
    var { isLoading, data } = useGetAllCampaingsQuery()
    var nav = useNavigate()
    
    return (
        <div className="bg-light">
            <div className="container">
                <h1>All Campaignes</h1>
                {
                    isLoading && "...Loading...."
                }
                <div className=" d-flex flex-wrap justify-content-between">
                    {
                        !isLoading && data?.map((camp) => {
                            return <li className="wdli m-2">
                                <div class="card" >
                                    <img class="card-img-top" src={camp.imgUrl} />
                                    <div class="card-body">
                                        <h4 class="card-title">{camp.title}</h4>
                                        <p class="card-text">{camp.description} {`${camp.link}`}</p>

                                    </div>
                                    <div className="text-center">
                                        <button className="btn  form-control cardbtn card-bottom btn-outline-primary" value={camp.link}>copy link</button>
                                        <button className="btn form-control cardbtn card-bottom btn-outline-primary" onClick={()=>{nav(`/courseregistered/${camp.title}`)}} >View Registered</button>
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
export default AllCampaignes