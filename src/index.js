import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from './shared/Home';
import AdminDashboard from './features/dashboard/AdminDashboard';
import CampaignerDashboard from './features/dashboard/CampaignerDashboard';
import Login from './features/user/Login';
import CreateCampaign from './features/dashboard/CreateCampaign';
import AdRegistration from './features/dashboard/AdRegistration';
import AllCampaignes from './features/dashboard/AllComapignes';
import CampaignersDet from './features/dashboard/AllRegistered';
import CourseRegDet from './features/dashboard/CourseRegistationDetails';
import AllRegDet from './features/dashboard/AllRegistered';
import AllCampainerDet from './features/dashboard/AllCampainerDet';
import RegisteredMemByCam from './features/dashboard/RegisteredMembersByCampaigner';
import Profile from './features/user/Profile';
import EditProfile from './features/user/EditProfile';

const router = createBrowserRouter([
{
    path: "/",
    element: <App></App>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:'/admindashboard',
            element:<AdminDashboard></AdminDashboard>
        },
        {
            path:'/campaignerdashboard',
            element:<CampaignerDashboard/>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/createCampaign",
            element:<CreateCampaign></CreateCampaign>
        },
        {
            path:"/adRegistration/:cname/:pname",
            element:<AdRegistration></AdRegistration>
        },
        {
            path:"/allCampaignes",
            element:<AllCampaignes></AllCampaignes>
        },
        {
            path:"/allregistered",  
            element:<AllRegDet></AllRegDet>
        },
        {
            path:"/courseregistered/:pname",  
            element:<CourseRegDet></CourseRegDet>
        },
        {
            path:"/allcampaigner",  
            element:<AllCampainerDet></AllCampainerDet>
        },
        {
            path:"/registeredmembers/:rname",  
            element:<RegisteredMemByCam></RegisteredMemByCam>
        },
        {
            path:"/profile",  
            element:<Profile></Profile>
        },
        {
            path:"/editprofile",  
            element:<EditProfile></EditProfile>
        },
    ]
},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><RouterProvider router={router} /></Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals