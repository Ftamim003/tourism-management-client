import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const AddPackageForm = () => {

    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        price: "",
        images: ["", "", ""],
        description: "",
        tourPlan: [
            {
                title: "",
                description: "",
                activities: ["", "", ""],
            },
        ],
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value, // Convert 'price' to a number
        }));;
    };

    // Handle dynamic changes (e.g., images, tourPlan)
    const handleDynamicChange = (index, field, value, parentField) => {
        setFormData((prev) => {
            const updated = [...prev[parentField]];
            updated[index] = value; // Directly update the value at the specified index
            return { ...prev, [parentField]: updated };
        });
    };

    // Handle adding more fields
    const addTourPlan = () => {
        setFormData((prev) => ({
            ...prev,
            tourPlan: [
                ...prev.tourPlan,
                { title: "", description: "", activities: ["", "", ""] },
            ],
        }));
    };

    const updateTourPlan = (index, field, value) => {
        setFormData((prev) => {
            const updatedTourPlan = [...prev.tourPlan];
            updatedTourPlan[index][field] = value; // Update the specific field
            return { ...prev, tourPlan: updatedTourPlan };
        });
    };

    const addActivity = (planIndex) => {
        setFormData((prev) => {
            const updatedTourPlan = [...prev.tourPlan];
            updatedTourPlan[planIndex].activities.push(""); // Add new activity
            return { ...prev, tourPlan: updatedTourPlan };
        });
    };
    

    const updateActivity = (planIndex, actIndex, value) => {
        setFormData((prev) => {
            const updatedTourPlan = [...prev.tourPlan];
            updatedTourPlan[planIndex].activities[actIndex] = value; // Update activity
            return { ...prev, tourPlan: updatedTourPlan };
        });
    };
    

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post the formData to your backend API
            const response = await axiosSecure.post("/packages", formData);

            if (response.status === 201 || response.status === 200) {
                Swal.fire("Success", "Package added successfully!", "success");

                // Reset the form after successful submission
                setFormData({
                    title: "",
                    type: "",
                    price: "",
                    images: ["", "", ""],
                    description: "",
                    tourPlan: [{ title: "", description: "", activities: ["", "", ""] }],
                });
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
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Add New Package</h2>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                {/* Type */}
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label className="block text-gray-700">Images (URLs)</label>
                    {formData.images.map((image, index) => (
                        <input
                            key={index}
                            type="text"
                            value={image}
                            onChange={(e) =>
                                handleDynamicChange(index, "images", e.target.value, "images")
                            }
                            className="w-full border rounded-lg px-4 py-2 mb-2"
                        />
                    ))}
                </div>


                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2"
                        required
                    />
                </div>

                {/* Tour Plan */}
                <div className="mb-4">
                    <label className="block text-gray-700">Tour Plan</label>
                    {formData.tourPlan?.map((plan, index) => (
                        <div key={index} className="border rounded-lg p-4 mb-4">
                            {/* Title Field */}
                            <div className="mb-2">
                                <label className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={plan.title}
                                    onChange={(e) => updateTourPlan(index, "title", e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            {/* Description Field */}
                            <div className="mb-2">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    value={plan.description}
                                    onChange={(e) => updateTourPlan(index, "description", e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2"
                                    required
                                />
                            </div>

                            {/* Activities */}
                            <div>
                                <label className="block text-gray-700">Activities</label>
                                {plan.activities?.map((activity, actIndex) => (
                                    <input
                                        key={actIndex}
                                        type="text"
                                        value={activity}
                                        onChange={(e) =>
                                            updateActivity(index, actIndex, e.target.value)
                                        }
                                        className="w-full border rounded-lg px-4 py-2 mb-2"
                                    />
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addActivity(index)}
                                    className="btn btn-secondary mt-2"
                                >
                                    Add Activity
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addTourPlan}
                        className="btn btn-primary"
                    >
                        Add Tour Plan
                    </button>
                </div>


                {/* Submit Button */}
                <button type="submit" className="btn btn-success w-full">
                    Submit Package
                </button>
            </form>
        </div>
    );
};

export default AddPackageForm;

