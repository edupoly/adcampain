import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
    const nav = useNavigate()
    var userDet = useSelector(state => state.usr.userDetails)
    console.log(userDet);

    const handleEdit = () => {
        nav("/editprofile")
    }

    return (
        <div className="  ">
            <h1 className="text-center">Wellcome To Profile</h1>
            <div className=" border shadow rounded w-50 m-auto p-5  text-center">
                <div className="position-relative">
                    {/* <img src={userDet.photoUrl} width='100px' height='100px' style={{ borderRadius: '50%' }} /> */}
                    {userDet.photoUrl && <img src={userDet.photoUrl} width='100px' height='100px' style={{ borderRadius: '50%' }} />}
                    {!userDet.photoUrl && <i class="bi bi-person-circle personicon"></i>}
                    <button onClick={() => { handleEdit() }} className="position-absolute end-0 top-0 btn btn-danger">Edit</button>
                </div>
                <h5>Name: {userDet.username}</h5>
                <h5>Phone Number: {userDet.phone}</h5>
                <h5>Email: {userDet.email}</h5>
                <h5>Role: {userDet.role}</h5>
            </div>
        </div>
    )
}
export default Profile 