import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAdRegistrationMutation, useAddCampaignMutation } from '../../services/jsonApi';
import { useParams } from 'react-router-dom';

function AdRegistration() {
    var {cname}=useParams();
    var [newRegistrationFn]=useAdRegistrationMutation();
    var adRegistrationForm = useFormik({
        initialValues:{
            name:'',
            phone:'',
            campaigner:cname,
            date:(new Date()).getTime()
        },
        onSubmit:(values)=>{
            // console.log(values)
            newRegistrationFn(values).then(()=>{alert("Thanks for registration")})
        }

    })
  return (
    <div>
        <h1>AdRegistration</h1>
            <form onSubmit={adRegistrationForm.handleSubmit}>
                <input type="text" name='name' placeholder='Enter Name' onChange={adRegistrationForm.handleChange}/>
                <br />
                <input type="text" name='phone' placeholder='Enter Phonenumber' onChange={adRegistrationForm.handleChange}/>
                <br />
               
                <button>Add Campaign</button>
            </form> 
    </div>
  )
}

export default AdRegistration