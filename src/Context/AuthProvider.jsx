import { useEffect, useState } from "react";
import AuthContext from "./AUthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";

const googleProvider= new GoogleAuthProvider()
const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const axiosPublic=useAxiosPublic();

    const createUser= (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const userLogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateProfileUser=(updateData)=>{
        return updateProfile(auth.currentUser,updateData)
    }
    
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            if(currentUser){
                const userInfo={
                    email: currentUser.email
                };
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                   if(res.data.token){
                    localStorage.setItem('access-token',res.data.token)
                    setLoading(false)
                   }
                })
            }
            else{
                localStorage.removeItem('access-token'); 
                setLoading(false);      
            }
            
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    const googleSignIn =() =>{
        return signInWithPopup(auth,googleProvider)
    }

   const authInfo ={
      user,
      loading,
      createUser,
      userLogin,
      logOut,
      setUser,
      updateProfileUser,
      googleSignIn
   }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;