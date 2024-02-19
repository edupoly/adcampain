import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAdRegistrationMutation, useAddCampaignMutation } from '../../services/jsonApi';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser'


function AdRegistration() {
    var { cname, pname } = useParams();
    var [newRegistrationFn] = useAdRegistrationMutation();
    var ref = React.useRef()


    var adRegistrationForm = useFormik({
        initialValues: {
            name: '',
            phone: '',
            course: pname,
            campaigner: cname,
            email: '',
            date: (new Date()).getTime()
        },
        onSubmit: (values) => {
            newRegistrationFn(values).then(() => { alert("Thanks for registration") })
            emailjs
                .sendForm('service_l45qocw', 'template_ju8yijr', ref.current, {
                    publicKey: 'GQ-d6vFeHDue6z6MD',
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );
        }
    

    })
return (
    <div>
        <h1>AdRegistration</h1>
        <form onSubmit={adRegistrationForm.handleSubmit} ref={ref}>
            <input type="text" name='name' placeholder='Enter Name' onChange={adRegistrationForm.handleChange} />
            <br />
            <input type="text" name='course' value={adRegistrationForm.values.course} placeholder='Enter Course' onChange={adRegistrationForm.handleChange} />
            <br />
            <input type="text" name='phone' placeholder='Enter Phonenumber' onChange={adRegistrationForm.handleChange} />
            <br />
            <input type="email" name='email' placeholder='Enter Email' onChange={adRegistrationForm.handleChange} />
            <br />
            <button type='submit'>Registration</button>
        </form>
    </div>
)
}

export default AdRegistration