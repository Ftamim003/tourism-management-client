import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';

const MyAssignedTours = () => {
    const axiosSecure=useAxiosSecure();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const guideName = "Guide_1"; // Replace with the authenticated user's name.

    useEffect(() => {
        const fetchAssignedTours = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`assignedTours/${guideName}`);
                setTours(response.data);
            } catch (err) {
                console.error("Error fetching assigned tours:", err);
                setError("Failed to fetch assigned tours.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignedTours();
    }, [guideName]);

    const updateTourStatus = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/updateTourStatus/${id}`, {
                status,
            });

            if (response.data.message) {
                setTours((prev) =>
                    prev.map((tour) =>
                        tour._id === id ? { ...tour, status } : tour
                    )
                );
                Swal.fire("Success", `Tour status updated to ${status}.`, "success");
            }
        } catch (error) {
            console.error("Error updating tour status:", error);
            Swal.fire("Error", "Failed to update tour status.", "error");
        }
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to reject this tour.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                updateTourStatus(id, "Rejected");
            }
        });
    };

    const handleAccept = (id) => {
        updateTourStatus(id, "Accepted");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Assigned Tours</h1>
            {tours.length > 0 ? (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-sm">Package Name</th>
                            <th className="px-4 py-2 text-sm">Tourist Name</th>
                            <th className="px-4 py-2 text-sm">Tour Date</th>
                            <th className="px-4 py-2 text-sm hidden sm:table-cell">Price</th>
                            <th className="px-4 py-2 text-sm">Status</th>
                            <th className="px-4 py-2 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour._id} className="border-t">
                                <td className="px-4 py-2 text-sm">{tour.packageName}</td>
                                <td className="px-4 py-2 text-sm">{tour.touristName}</td>
                                <td className="px-4 py-2 text-sm">{new Date(tour.tourDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-sm hidden sm:table-cell">{tour.price}</td>
                                <td className="px-4 py-2 text-sm capitalize">{tour.status}</td>
                                <td className="px-4 py-2 text-sm space-x-2">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
                                        disabled={tour.status !== "in review"}
                                        onClick={() => handleAccept(tour._id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                        onClick={() => handleReject(tour._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
                <p>No assigned tours available.</p>
            )}
        </div>
    );
};

export default MyAssignedTours;
