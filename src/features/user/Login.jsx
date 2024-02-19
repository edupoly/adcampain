import { useFormik } from 'formik'
import React from 'react'
import { useAdCampaignersThroughGlgMutation, useLazyCheckUserQuery, useLazyGetGoogleUsersQuery } from '../../services/jsonApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './userSlice';
import * as Yup from 'yup';
import { auth } from '../../app/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

function Login() {
    const [checkuser]=useLazyCheckUserQuery()
    const navigate=useNavigate()
    const user = useSelector(state=>state.usr);
    var dispatch = useDispatch()
    const [getUserfn] = useLazyGetGoogleUsersQuery()
    const [addusers] = useAdCampaignersThroughGlgMutation()

    const signIn = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then((res)=>{

            console.log(res.user.displayName);

            getUserfn(res.user.email).then((res1)=>{
                console.log(res1);
                if(res1.data.length === 0){
                    let newObj = {
                        username: res.user.displayName,
                        email : res.user.email,
                        phone : '',
                        photoUrl : res.user.photoURL,
                        role:"campaigner",
                        password :'',
                    }
                    addusers(newObj)
                    // console.log(newObj);
                    dispatch(login(newObj))
                    navigate('/campaignerdashboard')
                }
                else{
                    dispatch(login(res1.data[0]))
                }
                if(res1.data[0]?.role === 'campaigner'){
                    navigate('/campaignerdashboard')
                }
                else{
                    navigate('/admindashboard')
                }
            })
        })
    }


    var loginForm = useFormik({
        initialValues:{
            username:'',
            password:''
        },
        validationSchema:Yup.object({
            username:Yup.string().required("Please enter Username"),
            password:Yup.string().required("Please enter Password"),
        }),
        onSubmit:(values)=>{
            // console.log(values)
            checkuser(values).then((res)=>{
                console.log("login res",res)
                if(res.data.length===0){
                    alert("Please enter valid credentials")
                    loginForm.setErrors({credentials:'notvalid'})
                }
                else{
                    dispatch(login({...res.data[0]}))
                }
                if(res.data[0]?.role==='admin')
                {
                    navigate('/admindashboard')
                }
                else if(res.data[0]?.role==='campaigner')
                {
                    navigate('/campaignerdashboard')
                }
            })
        }

    })
  return (
    <div className='bg-light'>
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={loginForm.handleSubmit}>
                <input type="text" name='username' placeholder='username' onBlur={loginForm.handleBlur} onChange={loginForm.handleChange}/>
                <div>{loginForm.touched.username && loginForm.errors.username}</div>
                <input type="text" name='password' placeholder='password' onBlur={loginForm.handleBlur} onChange={loginForm.handleChange}/>
                <div>{loginForm.touched.password && loginForm.errors.password}</div>
                <button type='submit'>Login</button>
                <div>{loginForm.touched && loginForm.errors.credentials}</div>
            </form>
            <div>
                <button onClick={signIn}>SignIn with google</button>
            </div>
        </div>
    </div>
  )
}

export default Login