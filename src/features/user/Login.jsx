import { useFormik } from 'formik'
import React from 'react'
import { useLazyCheckUserQuery } from '../../services/jsonApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './userSlice';
import * as Yup from 'yup';
function Login() {
    const [checkuser]=useLazyCheckUserQuery()
    const navigate=useNavigate()
    const user = useSelector(state=>state.usr);
    var dispatch = useDispatch()
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
                console.log(res);
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
                else if(res.data[0]?.role==='user')
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
        </div>
    </div>
  )
}

export default Login