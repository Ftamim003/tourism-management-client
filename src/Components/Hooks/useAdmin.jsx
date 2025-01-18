import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import AUthContext from "../../Context/AUthContext";


const useAdmin = () => {
    const {user,loading}=useContext(AUthContext);
    const axiosSecure=useAxiosSecure();
    const {data:isAdmin, isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!loading,
        queryFn: async()=>{
            const res=await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useAdmin;