import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useAddCampaignMutation } from '../../services/jsonApi';

function CreateCampaign() {
    var [addCampaignFn]=useAddCampaignMutation();
    var createCampaignForm = useFormik({
        initialValues:{
            title:'',
            description:'',
            imgUrl:'',
            link:'',
            date:(new Date()).getTime()
        },
        onSubmit:(values)=>{
            addCampaignFn(values).then((res)=>{
                console.log(res)
            })
        }

    })
  return (
    <div className='bg-light'>
        <div className='container'>
            <h1>CreateCampaign</h1>
            <form onSubmit={createCampaignForm.handleSubmit}>
                <input type="text" name='title' placeholder='Enter Title' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="text" name='description' placeholder='Enter Description' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="text" name='imgUrl' placeholder='Enter Image Url' onChange={createCampaignForm.handleChange}/>
                <br />
                <input type="text" name='link' placeholder='Enter contact Url' onChange={createCampaignForm.handleChange}/>
                <br />
                <button>Add Campaign</button>
            </form> 
        </div>
    </div>
  )
}

export default CreateCampaign