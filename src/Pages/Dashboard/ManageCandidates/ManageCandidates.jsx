import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import AUthContext from "../../../Context/AUthContext";

const ManageCandidates = () => {
    
    const axiosSecure=useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    // Fetch applications
    const { data: applications = [], isError } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const response = await axiosSecure.get("/guideApplication"); 
            return response.data;
        },
        onError: (error) => {
            console.error("Error fetching applications:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch applications.",
            });
        },
    });

    // Mutation for Accepting a candidate
    const acceptMutation = useMutation({
        mutationFn: async (email) => {
            await axiosSecure.patch(`/users/role`, { email, role: "guide" });
            await axiosSecure.delete(`/guideApplication`,{ data: { email } });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["applications"]);
            Swal.fire({
                icon: "success",
                title: "Accepted",
                text: "Application accepted and role updated to Tour Guide.",
            });
        },
        onError: (error) => {
            console.error("Error accepting application:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to accept application.",
            });
        },
    });

    // Mutation for Rejecting a candidate
    const rejectMutation = useMutation({
        mutationFn: async (email) => {
            await axiosSecure.delete(`/guideApplication`,{ data: { email } });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["applications"]);
            Swal.fire({
                icon: "success",
                title: "Rejected",
                text: "Application rejected.",
            });
        },
        onError: (error) => {
            console.error("Error rejecting application:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to reject application.",
            });
        },
    });

    // Handle Accept
    const handleAccept = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will accept the application and update the role to Tour Guide.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, accept it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                acceptMutation.mutate(email);
            }
        });
    };

    // Handle Reject
    const handleReject = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will reject the application.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                rejectMutation.mutate(email);
            }
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Manage Candidates</h2>
            {isLoading ? (
                <p>Loading applications...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to load applications. Please try again.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white border border-gray-300 shadow-md rounded-md">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 border-b">Name</th>
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Role</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-100">
                                        <td className="p-3 border-b">{app.name}</td>
                                        <td className="p-3 border-b">{app.email}</td>
                                        <td className="p-3 border-b">User/Tourist</td>
                                        <td className="p-3 border-b">
                                            <button
                                                onClick={() => handleAccept(app.email)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(app.email)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center p-3 text-gray-500"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCandidates;
