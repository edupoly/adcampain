import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserDetailsMutation } from "../../services/jsonApi";
import { login } from "./userSlice";

function EditProfile() {

    const userDet = useSelector(state => state.usr.userDetails)
    const [updateuser] = useUpdateUserDetailsMutation()
    const dispatch = useDispatch()

    const handleimg = (e) => {
        console.log(e);
        var x = URL.createObjectURL(e.target.files[0])
        editForm.values.photoUrl = x
        console.log(x);
    }

    const editForm = useFormik({
        initialValues: userDet,


        onSubmit: (values) => {
            updateuser(values)
            dispatch(login(values))
            alert('updated successfully...')
            console.log(values);
        }
    })
    return (
        <div className="container">
            <h1>Edit Profile Page</h1>
            <div>
                <form onSubmit={editForm.handleSubmit}>
                    <input type="file" id="file" name="photoUrl" onChange={(e) => { handleimg(e) }} /> <br />
                    <label htmlFor="file">
                        {/* <img src={editForm.values.photoUrl} width='70px' height='70px' className="editpic" /> */}
                        {editForm.values.photoUrl && <img src={editForm.values.photoUrl} width='100px' height='100px' style={{borderRadius:'50%',border:'1px solid'}} />}
                           {!editForm.values.photoUrl && <i class="bi bi-person-plus personicon"></i>}
                    </label> <br />

                    <input type="text" name="username" value={editForm.values.username} onChange={editForm.handleChange} placeholder="Enter username" /> <br />
                    <input type="email" name="email" value={editForm.values.email} onChange={editForm.handleChange} placeholder="Enter your Email" /> <br />
                    <input type="number" name="phone" value={editForm.values.phone} onChange={editForm.handleChange} placeholder="Enter Phone Number" /> <br />
                    <input type="password" name="password" value={editForm.values.password} onChange={editForm.handleChange} placeholder="Enter Password" /> <br />
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}
export default EditProfile