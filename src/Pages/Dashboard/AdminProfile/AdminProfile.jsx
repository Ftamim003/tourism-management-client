import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
const AdminProfile = () => {
    const axiosSecure=useAxiosSecure();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosSecure.get("/admin/stats"); // Adjust API endpoint as per your setup
                setStats(response.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
                setError("Failed to load stats. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) return <p>Loading stats...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard - Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Payment</h3>
                    <p className="text-xl font-bold text-green-500">TK. {stats.totalPayment.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Tour Guides</h3>
                    <p className="text-xl font-bold">{stats.totalTourGuides}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Packages</h3>
                    <p className="text-xl font-bold">{stats.totalPackages}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Clients</h3>
                    <p className="text-xl font-bold">{stats.totalClients}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Total Stories</h3>
                    <p className="text-xl font-bold">{stats.totalStories}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;