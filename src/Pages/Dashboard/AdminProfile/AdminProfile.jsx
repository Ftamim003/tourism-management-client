import React from 'react';
import { useEffect, useState } from "react";
import { FiDollarSign, FiUsers, FiPackage, FiUserCheck, FiBookOpen } from "react-icons/fi";
import CountUp from "react-countup";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS animation
        const fetchStats = async () => {
            try {
                const response = await axiosSecure.get("/admin/stats");
                setStats(response.data);
            } catch (err) {
                setError("Failed to load stats. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) return <p>Loading stats...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const data = [
        { name: "Payments", value: stats.totalPayment },
        { name: "Guides", value: stats.totalTourGuides },
        { name: "Packages", value: stats.totalPackages },
        { name: "Clients", value: stats.totalClients },
        { name: "Stories", value: stats.totalStories },
    ];

    const statCards = [
        { title: "Total Payment", value:  stats.totalPayment, icon: '৳', color: "bg-green-500" },
        { title: "Total Tour Guides", value: stats.totalTourGuides, icon: <FiUsers />, color: "bg-blue-500" },
        { title: "Total Packages", value: stats.totalPackages, icon: <FiPackage />, color: "bg-purple-500" },
        { title: "Total Clients", value: stats.totalClients, icon: <FiUserCheck />, color: "bg-orange-500" },
        { title: "Total Stories", value: stats.totalStories, icon: <FiBookOpen />, color: "bg-pink-500" },
    ];

    const tourGuideVsClientData = [
        { name: "Tour Guides", value: stats.totalTourGuides },
        { name: "Clients", value: stats.totalClients }
    ];

    const COLORS = ["#8884d8", "#82ca9d"];

    const revenueVsServicesData = [
        { name: "Revenue (TK)", value: stats.totalPayment },
        { name: "Total Packages", value: stats.totalPackages },
        { name: "Total Stories", value: stats.totalStories }
    ];
    const BAR_COLORS = ["#ff7300", "#387908", "#0088FE"];
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" data-aos="fade-up">Admin Dashboard</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
                {statCards.map((stat, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition duration-300">
                        <div className={`p-4 ${stat.color} text-white rounded-lg text-3xl`}>{stat.icon}</div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                            <p className="text-2xl font-bold"><CountUp start={0} end={stat.value} duration={2} separator="," /></p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tour Guide vs Clients Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-center mb-4">Tour Guide vs Clients Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={tourGuideVsClientData}
                                cx="50%" cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {tourGuideVsClientData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue vs Services */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-center mb-4">Revenue vs Services</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={revenueVsServicesData}
                                cx="50%" cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {revenueVsServicesData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>


            {/* Stats Chart */}
            <div className="mt-10 p-6 bg-white rounded-lg shadow-lg" data-aos="fade-up">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistics Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminProfile;