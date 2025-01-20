
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
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";
import AddStory from "../Pages/Dashboard/AddStory/AddStory";
import ManageStories from "../Pages/Dashboard/ManageStory/ManageStories";
import EditStory from "../Pages/Dashboard/EditStory/EditStory";
import GuideApplication from "../Pages/Dashboard/TourGuideApplication/GuideApplication";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/ManageUser/ManageUsers";
import ManageCandidates from "../Pages/Dashboard/ManageCandidates/ManageCandidates";
import TourGuideProfile from "../Pages/TourGuideProfile/TourGuideProfile";
import MyAssignedTours from "../Pages/Dashboard/MyAssignedTour/MyAssignedTours";


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
          path:'tourGuide/:id',
          element:<TourGuideProfile></TourGuideProfile>,
          loader:({params})=>fetch(`http://localhost:5000/tourGuide/${params.id}`)

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
          path:'myAssignedTours',
          element:<MyAssignedTours></MyAssignedTours>

        },
        {
          path: 'profile',
          element:<ManageProfile></ManageProfile>
        },
        {
            path:'story',
            element:<AddStory></AddStory>
        },

        {
          path:'manageStories',
          element:<ManageStories></ManageStories>
        },
        {
            path:'payment/:id',
            element:<Payment></Payment>,
            loader:({params})=>fetch(`http://localhost:5000/payment/${params.id}`)
        },

        {
          path:'edit-story/:id',
          element:<EditStory></EditStory>,
          loader:({params})=>fetch(`http://localhost:5000/stories/${params.id}`)
      },
      {
         path:"guideApplicant",
         element:<GuideApplication></GuideApplication>
         
      },


       // Admin Routes
       {
           path:'adminProfile',
           element:<AdminProfile></AdminProfile>
       },
       {
         path:'addPackage',
         element:<AdminRoute><AddPackageForm></AddPackageForm></AdminRoute>
       },
        {

          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'manageUsers',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'manageCandidates',
          element:<AdminRoute><ManageCandidates></ManageCandidates></AdminRoute>
        }

      ]
    }
  ]);