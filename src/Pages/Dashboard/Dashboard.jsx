import { NavLink, Outlet } from "react-router-dom";

import { FaBook, FaHome } from "react-icons/fa";
import useInfo from "../../Components/Hooks/useInfo";
import useAdmin from "../../Components/Hooks/useAdmin";


const Dashboard = () => {
    const [bookings]=useInfo();
    
    const [isAdmin]=useAdmin();
    return (
        <div>
            
            <div className="flex">
                <div className="w-64 min-h-screen bg-blue-500">
                    <ul className="menu p-3">
                       
                   {isAdmin ? <>
                    <li><NavLink to='/dashboard/adminHome'>
                                <FaHome></FaHome>
                                Admin Home</NavLink></li>

                            <li><NavLink to='/dashboard/addPackage'>
                                
                                Add Package</NavLink>
                            </li>
                            <li><NavLink to='/dashboard/manageItems'>
                                
                                Manage Items</NavLink>
                            </li>
                            <li><NavLink to='/dashboard/bookings'>
                                
                                Manage Bookings</NavLink>
                            </li>
                            <li><NavLink to='/dashboard/users'>
                                
                                All Users</NavLink>
                            </li>
                   </> : <>
                   <li>
                            
                            <NavLink to='/dashboard/profile'><FaBook></FaBook> Manage Profile </NavLink>
                        </li>
                        <li>
                            
                            <NavLink to='/dashboard/bookings'><FaBook></FaBook> My Bookings ({bookings.length})</NavLink>
                        </li>
                        <li>
                            
                            <NavLink to='/dashboard/userHome'><FaHome></FaHome> Manage Stories</NavLink>
                        </li>
                        <li>
                            
                            <NavLink to='/dashboard/userHome'><FaHome></FaHome>Add Stories</NavLink>
                        </li>
                        <li>
                            
                            <NavLink to='/dashboard/userHome'><FaHome></FaHome>Join as tour guide </NavLink>
                        </li>
                   </>}

                           





                      
                        <div className="divider"></div>
                        <li>
                            
                            <NavLink to='/'><FaHome></FaHome> Home</NavLink>
                        </li>
                    </ul>

                </div>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;