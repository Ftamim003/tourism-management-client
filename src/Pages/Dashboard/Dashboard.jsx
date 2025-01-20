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
        <div>
            <div className="flex">
                <div className="w-40 md:w-64 min-h-screen bg-blue-500">
                    <ul className="menu p-3">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminProfile">
                                        <FaHome />
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
                                        <FaBook />
                                         Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myAssignedTours">
                                        <FaBook />
                                        My Assigned Tours
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageStories">
                                        <FaHome />
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/story">
                                        <FaHome />
                                        Add Stories
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                        <FaBook />
                                        Manage Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook />
                                        My Bookings ({bookings.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageStories">
                                        <FaHome />
                                        Manage Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/story">
                                        <FaHome />
                                        Add Stories
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/guideApplicant">
                                        <FaHome />
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
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;