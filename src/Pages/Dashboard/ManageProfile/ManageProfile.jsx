import useBookingInfo from "../../../Components/Hooks/useInfo";
import { useContext, useState } from "react";
import AUthContext from "../../../Context/AUthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useAdmin from "../../../Components/Hooks/useAdmin";
import useGuide from "../../../Components/Hooks/useGuide";

const ManageProfile = () => {
    const { user, setUser } = useContext(AUthContext);
    const [isAdmin] = useAdmin();
    const [isGuide] = useGuide();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        photo: user?.photoURL || "",
    });

    const handleEdit = () => {
        if (user) {
            setIsModalOpen(true);
            setFormData({
                name: user.displayName || "",
                photo: user.photoURL || "",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "User data is not available.",
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!user.email) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "User email is missing!",
            });
            return;
        }
        try {
            const response = await axiosSecure.put(`/update-profile/${user.email}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = response.data;

            if (result.success) {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: formData.name,
                    photoURL: formData.photo,
                }));

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile updated successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });

                setIsModalOpen(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: result.message,
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while updating your profile.",
            });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName || "User"}!</h2>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{user?.displayName || "N/A"}</h3>
                        <p className="text-gray-600">Role: {isAdmin ? "Admin" : isGuide ? "Guide" : "User"}</p>
                    </div>
                </div>

                <div className="space-y-4 border rounded-lg p-6 shadow-md bg-white">
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">First Name:</strong> {user?.displayName || "Not provided"}
                    </p>
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">Last Name:</strong> {user?.lastName || "Not provided"}
                    </p>
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">Email:</strong> {user?.email || "Not provided"}
                    </p>
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">Phone Number:</strong> {user?.phone || "Not provided"}
                    </p>
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">Date of Birth:</strong> {user?.dob || "Not provided"}
                    </p>
                    <p className="text-gray-700 border-b pb-2">
                        <strong className="text-gray-900">Address:</strong> {user?.address || "Not provided"}
                    </p>

                    <button
                        onClick={handleEdit}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>


            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Photo URL</label>
                                <input
                                    type="text"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || "Not provided"}
                                    readOnly
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Role</label>
                                <input
                                    type="text"
                                    value={isAdmin ? "Admin" : isGuide ? "Guide" : "User"}
                                    readOnly
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </form>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProfile;
