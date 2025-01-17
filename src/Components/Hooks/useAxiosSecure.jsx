import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AUthContext from "../../Context/AUthContext";


const axiosSecure= axios.create({
    baseURL:'http://localhost:5000',
})

const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logOut}=useContext(AUthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token')

        config.headers.authorization= `Bearer ${token}`
        return config;
    },  function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      //intercepts 401 and 403 status
      axiosSecure.interceptors.response.use(function(response){
        return response;
      },async (error)=>{
        const errorStatus=error.response.status
       // console.log('status error in the interceptor',errorStatus)

        if(errorStatus===401 || errorStatus===403){
          await logOut();  
          navigate('/login')
        }

        return Promise.reject(error)
      })
    return axiosSecure;
};

export default useAxiosSecure;