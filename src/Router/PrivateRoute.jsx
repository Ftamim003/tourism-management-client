import { useContext } from "react";
import AUthContext from "../Context/AUthContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AUthContext)

    const location=useLocation();

    if(loading){

        return <span className="loading loading-ring loading-lg"></span>
    }

    if(user){
        return children;
    }
    return <Navigate state={{ from: location.pathname }} to={'/login'} ></Navigate>
};


export default PrivateRoute;