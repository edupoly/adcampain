import { useFormik } from 'formik'
import React from 'react'
import { useAddNewUserMutation, useLazyCheckExistingUserQuery, useLazyCheckUserQuery } from '../../services/jsonApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './userSlice';
import * as Yup from 'yup';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../app/firebase'
const Login = () => {
    const [checkuser] = useLazyCheckUserQuery()
    const [checkExisting] = useLazyCheckExistingUserQuery()
    const [adduser] = useAddNewUserMutation()
    const navigate = useNavigate()
    // const user = useSelector(state=>state.usr);
    var dispatch = useDispatch()
    function handleSignIn() {
        const signin = new GoogleAuthProvider()
        signInWithPopup(auth, signin).then((res) => {
            console.log("res", res)
            checkExisting(res.user.email).then((res1) => {
                console.log("res1", res1)
                if (res1.data.length === 0) {
                    let newUserObj = {
                        email: res.user.email,
                        password: "",
                        username: res.user.displayName,
                        role: "campaigner",
                        photoURL: res.user.photoURL,
                        phone: "",
                    }
                    adduser(newUserObj).then((res2) => { console.log(res2); })
                    dispatch(login(newUserObj))
                }
                else {
                    dispatch(login({ ...res1.data[0] }))
                }
                navigate('/campaignerdashboard')
            })
        })
    }
    var loginForm = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please enter Username"),
            password: Yup.string().required("Please enter Password"),
        }),
        onSubmit: (values) => {
            // console.log(values)
            checkuser(values).then((res) => {
                console.log("login res", res)
                if (res.data.length === 0) {
                    alert("Please enter valid credentials")
                    loginForm.setErrors({ credentials: 'notvalid' })
                }
                else {
                    dispatch(login({ ...res.data[0] }))
                }
                if (res.data[0]?.role === 'admin') {
                    navigate('/admindashboard')
                }
                else if (res.data[0]?.role === 'campaigner') {
                    navigate('/campaignerdashboard')
                }
            })
        }

    })
    return (
        <div className='bg-light'>
            <div className='container w-25 p-5'>
                    <h1 className='text-center'>Login</h1>
                    <form className='m-3' onSubmit={loginForm.handleSubmit}>
                        <div>{loginForm.touched.username && loginForm.errors.username}</div>
                        <div className='form-floating'>
                            <input type="text" className='form-control' name='username' placeholder='username' onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} />
                            <label htmlFor="username">Enter Your Username</label>
                        </div>
                        <div>{loginForm.touched.password && loginForm.errors.password}</div>
                        <div className='form-floating'>
                            <input type="password" className='form-control' name='password' placeholder='password' onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} />
                            <label htmlFor="password">Enter Your Password</label>
                        </div>
                        <button className='btn btn-outline-primary' type='submit'>Login</button>
                        <div>{loginForm.touched && loginForm.errors.credentials}</div>
                    </form>
                    <button className='btn btn-danger' onClick={() => { handleSignIn() }}>Sign In with Google</button>
            </div>
            {/* <button className='leaf'>Leaf</button>
            <button className='ready'>Ready</button>
            <button className='set'>Set</button>
            <button className='go'>Go</button> */}
        </div>
    )
}

export default Login