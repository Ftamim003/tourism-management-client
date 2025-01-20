import { NavLink, Outlet } from "react-router-dom";

import { FaBook, FaHome } from "react-icons/fa";
import useInfo from "../../Components/Hooks/useInfo";
import useAdmin from "../../Components/Hooks/useAdmin";
import useGuide from "../../Components/Hooks/useGuide";


const Dashboard = () => {
    const [bookings]=useInfo();
    
    const [isAdmin]=useAdmin();

    const [isGuide] = useGuide();
    return (
            <div className="flex">
                <div className=" md:w-64 min-h-screen bg-blue-500">
                    <ul className="menu ">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                       
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addPackage">Add Package</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageCandidates">Manage Candidates</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users">All Users</NavLink>
                                </li>
                            </>
                        ) : isGuide ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                      
                                         Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myAssignedTours">
                                       
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageStories">
                                      
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/story">
                                        
                                        Add Stories
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                        
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                      
                                        My Bookings ({bookings.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageStories">
                                       
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/story">
                                       
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/guideApplicant">
                                       
                                        Join as Tour Guide
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 overflow-x-auto">
                    <Outlet />
                </div>
            </div>
        
    );
};

export default Dashboard;