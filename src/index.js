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
            path:"/adRegistration/:cname",
            element:<AdRegistration></AdRegistration>
        }
    ]
},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><RouterProvider router={router} /></Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals