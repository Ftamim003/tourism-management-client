
import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PackageDetails from "../Pages/Home/PackageDetails";


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
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        }
      ]
    },
  ]);