import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState(""); // Store search input
    const [selectedRole, setSelectedRole] = useState(null); // Store selected role for filtering

    // Role options for the dropdown
    const roleOptions = [
        { value: "", label: "All Roles" },
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
    ];

    // Fetch users using React Query
    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["users", searchQuery, selectedRole?.value],
        queryFn: async () => {
            const res = await axiosSecure.get("/users", {
                params: {
                    search: searchQuery,
                    role: selectedRole?.value || "",
                },
            });
            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching users:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch user data.",
            });
        },
    });

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle role filter change
    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Manage Users</h2>

    {/* Filters */}
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search Input */}
        <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
        />

        {/* Role Filter Dropdown */}
        <div className="w-full md:w-1/3">
            <Select
                options={roleOptions}
                value={selectedRole}
                onChange={handleRoleChange}
                placeholder="Filter by Role"
                isClearable
            />
        </div>
    </div>

    {/* User Table */}
    {isLoading ? (
        <p>Loading users...</p>
    ) : isError ? (
        <p className="text-red-500">Failed to load users. Please try again.</p>
    ) : (
        <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 shadow-md rounded-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 border-b text-sm md:text-base">Name</th>
                        <th className="p-3 border-b text-sm md:text-base">Email</th>
                        <th className="p-3 border-b text-sm md:text-base">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="p-3 border-b text-sm md:text-base">{user.name}</td>
                                <td className="p-3 border-b text-sm md:text-base">{user.email}</td>
                                <td className="p-3 border-b text-sm md:text-base">{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center p-3 text-gray-500"
                            >
                                No users found.
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

export default ManageUsers;

