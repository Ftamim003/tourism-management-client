
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PackageDetails from "../Pages/Home/PackageDetails";
import Community from "../Pages/Community/Community";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AllTrips from "../Pages/AllTrips/AllTrips";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Bookings from "../Pages/Dashboard/Bookings/Bookings";
import ManageProfile from "../Pages/Dashboard/ManageProfile/ManageProfile";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AddPackageForm from "../Pages/Dashboard/AddPackage/AddPackageForm";


export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/packages/:id',
          element:<PackageDetails></PackageDetails>,
          loader:({params})=>fetch(`http://localhost:5000/packages/${params.id}`)
        },
        {
        path:'community',
        element:<Community></Community>
        },
        {
          path:'aboutUs',
          element:<AboutUs></AboutUs>
        },
        {
           path:'trips',
           element:<AllTrips></AllTrips>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        },
        
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path: 'bookings',
          element:<Bookings></Bookings>
        },
        {
          path: 'profile',
          element:<ManageProfile></ManageProfile>
        },

       // Admin Routes
       {
         path:'addPackage',
         element:<AddPackageForm></AddPackageForm>
       },
        {

          path:'users',
          element:<AllUsers></AllUsers>
        }

      ]
    }
  ]);