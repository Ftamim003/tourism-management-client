import React, { useContext } from 'react';
import useAdmin from '../Components/Hooks/useAdmin';
import { useLocation } from 'react-router-dom';
import AUthContext from '../Context/AUthContext';

const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AUthContext)
    const [isAdmin,isAdminLoading]=useAdmin();
    const location=useLocation();

    if(loading || isAdminLoading){

        return <span className="loading loading-ring loading-lg"></span>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate state={{ from: location.pathname }} to={'/login'} ></Navigate>
};

export default AdminRoute;