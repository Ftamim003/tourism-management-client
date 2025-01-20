

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import AUthContext from "../../../Context/AUthContext";
import { useParams } from "react-router-dom";

const GuideApplication = () => {
    
    const {user}=useContext(AUthContext);
    const axiosSecure=useAxiosSecure();
    const [formData, setFormData] = useState({
        title: "",
        reason: "",
        cvLink: "",
        profilePicture:user.photoURL,
        name:user.displayName,
        email:user.email,
        role:'user',
      
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Post the formData to your backend API
            const response = await axiosSecure.post("/guideApplication", formData);

            if (response.status === 201 || response.status === 200) {
                const tourGuidesResponse = await axiosSecure.post("/tour-guides", formData);

                 if (tourGuidesResponse.status === 201 || tourGuidesResponse.status === 200) {
                Swal.fire("Success", "Application Sent!", "success");

                // Reset the form after successful submission
                setFormData({
                    title: "",
                    reason: "",
                    cvLink: "",
                });
            } else {
                Swal.fire("Error", "Application submitted, but failed to add guide.", "error");
            }
            } else {
                Swal.fire("Error", "Failed to add package", "error");
            }
        } catch (error) {
            console.error("Error posting package data:", error);
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Join as a Tour Guide</h2>

            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    {/* Application Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Application Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter application title"
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Reason for Application */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Why do you want to be a Tour Guide?
                        </label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Explain why you want to join as a tour guide"
                            className="w-full border rounded-lg px-4 py-2"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* CV Link */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            CV Link
                        </label>
                        <input
                            type="url"
                            name="cvLink"
                            value={formData.cvLink}
                            onChange={handleChange}
                            placeholder="Enter a link to your CV"
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuideApplication;
