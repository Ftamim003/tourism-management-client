
import useBookingInfo from "../../../Components/Hooks/useInfo";
import { useContext, useState } from "react";
import AUthContext from "../../../Context/AUthContext";
import Swal from "sweetalert2";
const ManageProfile = () => {
    // Fetch user data (Assuming `useLoaderData` fetches the user info)
    const {user} = useContext(AUthContext);

    // State for modal
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
           
            //console.log("Modal should open now");
        } else {
            //console.log("User data is undefined");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Add logic for saving updated profile data to the server
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Welcome Message */}
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName}!</h2>

            {/* User Information */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{user?.displayName}</h3>
                <p className="text-gray-600">Email: {user?.email}</p>
                <p className="text-gray-600">Role: User</p>

                {/* Edit Profile Button */}
                <button
                    onClick={handleEdit}
                    className="btn btn-primary mt-4"
                >
                    Edit Profile
                </button>

                {/* Apply for Tour Guide Button */}
                <button
                    onClick={() => (window.location.href = "/join-tour-guide")}
                    className="btn btn-secondary mt-4 ml-4"
                >
                    Apply for Tour Guide
                </button>
            </div>

            {/* Edit Profile Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

                        {/* Edit Form */}
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

                            {/* Email and Role (Read-Only) */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Role</label>
                                <input
                                    type="text"
                                    value='User'
                                    readOnly
                                    className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </form>

                        {/* Modal Buttons */}
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