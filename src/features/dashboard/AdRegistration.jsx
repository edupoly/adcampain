import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAdRegistrationMutation, useAddCampaignMutation } from '../../services/jsonApi';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const AdRegistration = () => {
    let { cname, pname } = useParams();
    console.log("cname", cname);
    console.log("pname", pname);
    if (!cname)
        cname = "Edupoly"
    if (!pname)
        pname = ''
    let form = React.useRef()
    let [newRegistrationFn] = useAdRegistrationMutation();
    let adRegistrationForm = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            campaigner: cname,
            course: pname,
            date: (new Date()).getTime()
        },
        onSubmit: (values) => {
            console.log(values)
            newRegistrationFn(values).then(()=>{alert("Thanks for registration")})
            emailjs.sendForm('service_g5ulfrm', 'template_d1eb2bl', form.current, {
                publicKey: 'Upcv4CGc6Q9581FiT',
            }).then(
                (res) => {
                    console.log('SUCCESS!', res);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
            console.log(form.current);
        }

    })
    return (
        <div>
            <h1>AdRegistration</h1>
            <form ref={form} onSubmit={adRegistrationForm.handleSubmit}>
                <input type="text" name='name' placeholder='Enter Name' onChange={adRegistrationForm.handleChange} />
                <br />
                <input type="text" name='phone' placeholder='Enter Phonenumber' onChange={adRegistrationForm.handleChange} />
                <br />
                <input type="text" name='email' placeholder='Enter Email' onChange={adRegistrationForm.handleChange} />
                <br />
                <input type="text" name='course' placeholder='Enter Course' value={adRegistrationForm.values.course} onChange={adRegistrationForm.handleChange} />
                <br />
                <button className='btn btn-primary'>Enroll</button>
            </form>
        </div>
    )
}

export default AdRegistration