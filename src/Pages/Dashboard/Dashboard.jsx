import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaHome, FaBars } from "react-icons/fa";
import useInfo from "../../Components/Hooks/useInfo";
import useAdmin from "../../Components/Hooks/useAdmin";
import useGuide from "../../Components/Hooks/useGuide";

const Dashboard = () => {
    const [bookings] = useInfo();
    const [isAdmin] = useAdmin();
    const [isGuide] = useGuide();

    // State for mobile sidebar visibility
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Navigate hook to close sidebar when route is clicked
    const navigate = useNavigate();

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleNavLinkClick = (to) => {
        navigate(to);
        setIsSidebarOpen(false); // Close sidebar after navigation
    };

    return (
        <div className="flex">
            {/* Hamburger icon for mobile */}
            <div className="md:hidden p-4">
                <FaBars className="text-black text-3xl cursor-pointer" onClick={handleSidebarToggle} />
            </div>

            {/* Sidebar */}
            <div
                className={`md:w-64 min-h-screen bg-blue-500 fixed top-0 left-0 bottom-0 transition-transform transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:block z-20`} // Sidebar with higher z-index
            >
                <ul className="menu">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminProfile" onClick={() => handleNavLinkClick('/dashboard/adminProfile')}>
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addPackage" onClick={() => handleNavLinkClick('/dashboard/addPackage')}>Add Package</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCandidates" onClick={() => handleNavLinkClick('/dashboard/manageCandidates')}>Manage Candidates</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers" onClick={() => handleNavLinkClick('/dashboard/manageUsers')}>Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" onClick={() => handleNavLinkClick('/dashboard/users')}>All Users</NavLink>
                            </li>
                        </>
                    ) : isGuide ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/profile" onClick={() => handleNavLinkClick('/dashboard/profile')}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myAssignedTours" onClick={() => handleNavLinkClick('/dashboard/myAssignedTours')}>
                                    My Assigned Tours
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageStories" onClick={() => handleNavLinkClick('/dashboard/manageStories')}>
                                    Manage Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/story" onClick={() => handleNavLinkClick('/dashboard/story')}>
                                    Add Stories
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/profile" onClick={() => handleNavLinkClick('/dashboard/profile')}>
                                    Manage Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings" onClick={() => handleNavLinkClick('/dashboard/bookings')}>
                                    My Bookings ({bookings.length})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageStories" onClick={() => handleNavLinkClick('/dashboard/manageStories')}>
                                    Manage Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/story" onClick={() => handleNavLinkClick('/dashboard/story')}>
                                    Add Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/guideApplicant" onClick={() => handleNavLinkClick('/dashboard/guideApplicant')}>
                                    Join as Tour Guide
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" onClick={() => handleNavLinkClick('/')}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main content area */}
            <div
                className={`flex-1 overflow-x-auto transition-all duration-300 ${
                    isSidebarOpen ? "" : "md:ml-64"
                }`}
            >
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
