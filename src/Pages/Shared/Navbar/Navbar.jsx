import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AUthContext from "../../../Context/AUthContext";

const Navbar = () => {
    const {user,setUser, logOut}=useContext(AUthContext);
    const handleLogout = async () => {
        try {
            await logOut();
            setUser(null); // Clear user state explicitly
            // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
    return (
        <div className="fixed w-full z-10 bg-white shadow-md">
        <div className="">
            <nav className="flex items-center">
                <div className="navbar ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex="0" role="button" className="btn btn-ghost md:hidden">
                                <i className="fa-solid fa-bars bg-white rounded-full border text-base w-12 border-black-600 p-3 shadow-md "></i>
                            </div>
                            <ul
                                tabIndex="0"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[2] mt-3 w-28 p-2 shadow">
                                <li><NavLink to='/'> Home </NavLink></li>
                                <li><NavLink to='/allRooms'>All Rooms </NavLink></li>
                                
                                

                                {/* {
                                    user && <>

                                        <li><NavLink to='/my-bookings'>My Booking</NavLink></li>

                                    </>
                                } */}

                                <li><NavLink to='/aboutUs'>About Us</NavLink></li>

                            </ul>
                        </div>
                        <div className="flex items-center w-72">

                            <h1 className="font-bold text-2xl text-[#1C3D5A] hidden md:block"><NavLink to='/'>
                                GetawayInn  </NavLink> </h1>
                            <div className="text-center mt-5 ">
                            </div>

                        </div>
                    </div>
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal px-1 text-lg">
                            <li ><NavLink to='/'> Home </NavLink></li>
                            <li><NavLink to='/allRooms'>All Rooms </NavLink></li>
                            <li><NavLink to='/login'>Login </NavLink></li>
                            {/* {
                                user && <>
                                    <li><NavLink to='/my-bookings'> My Bookings  </NavLink></li>

                                </>
                            } */}

                            <li><NavLink to='/aboutUs'>About Us</NavLink></li>


                        </ul>
                    </div>
                    <div className="navbar-end flex gap-7">
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="btn bg-[#1C3D5A] hover:bg-[#45749e] transition-colors duration-300 text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signUp"
                                    className="btn bg-green-600 hover:bg-green-700 hover:text-white transition-colors duration-300"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt="User Avatar" />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[2] "
                                >
                                    <li>
                                        <span className="font-bold">Hello, {user.displayName}</span>
                                    </li>

                                    <li>
                                        <button onClick={handleLogout} className="text-red-600">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </nav>
        </div>
    </div>
    );
};

export default Navbar;