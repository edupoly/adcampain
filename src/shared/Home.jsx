import React from 'react'
import Login from '../features/user/Login'
import { signOut } from 'firebase/auth'
import { auth } from '../app/firebase'

function Home() {
  const signOutg = ()=>{
    signOut(auth).then(()=>{
      alert('signOut')
    })
  }
  return (
    <div className='bg-light' style={{height:'500px'}}>
      <div className='container'>
        <h1>Edupoly Home Page</h1>
        <button className='leafbtn'>leaf</button> <br />
        <button className='ready'>Ready</button> <br />
        <button className='set'>Set</button> <br />
        <button className='go'>Go</button> <br />
      </div>
    </div>
  )
}

export default Home