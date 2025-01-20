import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";

import AUthContext from "../../Context/AUthContext";
import { useParams } from "react-router-dom";

const TourGuideProfile = () =>{
    const axiosSecure=useAxiosSecure();
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGuideDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`http://localhost:5000/tourGuide/${id}`);
                setGuide(response.data.guide);
                setStories(response.data.stories);
            } catch (err) {
                console.error("Error fetching guide details:", err);
                setError("Failed to load guide details.");
            } finally {
                setLoading(false);
            }
        };

        fetchGuideDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            {guide && (
                <div className="bg-white p-6 rounded-md shadow-md">
                    <div className="flex items-center space-x-4">
                        <img
                            src={guide.profilePicture}
                            alt={guide.name}
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">{guide.name}</h1>
                            <p className="text-gray-600">{guide.expertise}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-gray-800">{guide.bio}</p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Contact Information:</h3>
                        <p>Email: {guide.contactInfo.email}</p>
                        <p>Phone: {guide.contactInfo.phone}</p>
                    </div>
                </div>
            )}

            {stories.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">Tourist Stories</h2>
                    <div className="space-y-4">
                        {stories.map((story) => (
                            <div key={story._id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-semibold">{story.title}</h3>
                                <p className="text-gray-600">{story.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 mt-4">No stories available for this guide.</p>
            )}
        </div>
    );
};

export default TourGuideProfile;
