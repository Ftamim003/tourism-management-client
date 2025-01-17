import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import AUthContext from "../../Context/AUthContext";


const useInfo = () => {
    const {user}=useContext(AUthContext);
    const axiosSecure=useAxiosSecure();
    const {refetch,data: bookings=[]}=useQuery({

        queryKey:['bookings',user?.email],
        queryFn: async ()=>{
          const res= await axiosSecure.get(`/bookings?email=${user.email}`)
           return res.data
        }
    })
    return [bookings,refetch]
};

export default useInfo;