import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../services/jsonApi";
import { login } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    let {userDetails,isLoggedIn}=useSelector(state=>state.usr)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [updateFn]=useUpdateProfileMutation()
    if(!isLoggedIn)
    {
        console.log(1);
        navigate("/login")
    }
    // React.useEffect(()=>{
    //     navigate("/login")
    // },[])
    const profileFromik=useFormik({
        initialValues:{
            id:userDetails.id,
            email:userDetails.email,
            username:userDetails.username,
            password:userDetails.password,
            phone:userDetails.phone?userDetails.phone:"",
            role:userDetails.role,
            photoURL:userDetails.photoURL
        },
        onSubmit:(values)=>{
            console.log(values);
            updateFn(values).then((res)=>{console.log(res)
            dispatch(login(values))
            alert("Details Updated Successfully!!!")
            navigate(`/${userDetails.role}dashboard`)
        })
        }
    })
    const imgaeFn=(e)=>{
        console.log("image",e.target.files[0]);
        let temp=URL.createObjectURL(e.target.files[0])
        profileFromik.values.photoURL=temp
    }
    console.log(isLoggedIn);
    return (
        <section className="position-relative">
            <div className="profile-img text-center">
                {userDetails.photoURL&&<img style={{borderRadius:"50%"}} src={userDetails.photoURL} />}
                {!userDetails.photoURL&&<i className="bi bi-person icon"></i>}
                <div className="img-bg">
                    <label htmlFor="file"><i id="file-label" className="bi bi-person-plus icon"></i></label>
                    <input type="file" name="photoURL" accept="image/jpeg , image/png, image/jpg" id="file" onChange={(e)=>imgaeFn(e)} /><br />
                </div>
            </div>
            <h1>Profile Section</h1>
            <form onSubmit={profileFromik.handleSubmit}>
                <input type="email" disabled name="email" placeholder="Enter Your Email Id" value={profileFromik.values.email} onChange={profileFromik.handleChange}/><br />
                <input type="text" name="username" placeholder="Enter Your Username" value={profileFromik.values.username} onChange={profileFromik.handleChange}/><br />
                <input type="text" name="phone" placeholder="Enter Your Phone Number" value={profileFromik.values.phone} onChange={profileFromik.handleChange}/><br />
                <input type="password" name="password" placeholder="Enter Your Password" value={profileFromik.values.password} onChange={profileFromik.handleChange}/><br />
                
                <button type="submit">Update</button>
            </form>
        </section>
    )
}

export default Profile