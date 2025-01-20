import { useContext, useRef, useState } from "react";
import AUthContext from "../../Context/AUthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";


const Login = () => {
    const {userLogin,setUser,googleSignIn}=useContext(AUthContext);
    const [error, setError] = useState({});
    const [email, setEmail] = useState("");
    const axiosPublic=useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef=useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        //const email = e.target.email.value;
        const password = e.target.password.value

        userLogin(email, password)
            .then(result => {
                const user = result.user
                setUser(user)
                const redirectPath =  location.state?.from || "/";
                navigate(redirectPath);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: `Welcome, ${user.displayName || "User"}!`,
                    timer: 3000,
                    showConfirmButton: false,
                });
                
            })
            .catch((err) => {
                setError({ ...error, login: err.code })
            });
            // Swal.fire({
            //     icon: "error",
            //     title: "Login Failed",
            //     //text: err.message,
            // });
    }

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then((result)=>{
            const userInfo = {
                email:result.user?.email,
                name:result.user?.displayName,
                role:'user',
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data)
                const redirectPath =  location.state?.from ||  "/";
                navigate(redirectPath);
                Swal.fire({
                    icon: "success",
                    title: "Google Sign-In Successful",
                    timer: 3000,
                    showConfirmButton: false,
                });
            })
            
        })
    }

    const handleForgetPassword = () => {
        if (!email) {
            console.log("No email address provided");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please provide a valid email address.",
            });
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Password reset email has been sent. Please check your inbox.",
                    });
                })
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to send password reset email. Please try again.",
                    });
                });
        }
    };

    return (
        <div className="min-h-screen  flex justify-center items-center p-4">
            <div className="card bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
                <h2 className="text-center text-3xl font-bold text-[#1C3D5A] mb-6">
                    Login to Your Account
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-semibold">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-700 font-semibold">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered border-gray-300 focus:ring focus:ring-blue-200 rounded-lg"
                            required
                        />
                        {error.login && (
                            <label className="label text-sm text-red-600">{error.login}</label>
                        )}
                        {/* <Link
                            to="/auth/forgetPassword"
                            state={{ email }}
                            className="label mt-2 text-sm text-blue-500 hover:underline"
                        >
                            Forgot password?
                        </Link> */}
                        <label onClick={handleForgetPassword} className="label mt-2 text-sm text-blue-500 hover:underline"> <a href="#">Forget Password?</a></label>

                    </div>
                    <div className="form-control mt-4">
                        <button className="btn bg-[#1C3D5A] hover:bg-[#376083] text-white py-2 px-4 rounded-lg transition-colors duration-300">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-center mt-6 text-gray-700 font-medium">
                    Don't have an account?{" "}
                    <Link className="text-blue-500 font-semibold hover:underline" to="/signUp">
                        Register
                    </Link>
                </p>
                <div className="w-full mt-8">
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-white border border-gray-300 hover:border-[#1C3D5A] text-gray-700 hover:text-[#1C3D5A] w-full flex items-center justify-center py-2 px-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;