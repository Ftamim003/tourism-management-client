import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const TouristStory = () => {

    const [stories, setStories] = useState([]);
    const navigate = useNavigate();
    const axiosPublic=useAxiosPublic();
    useEffect(() => {
        // Fetch random stories
        axiosPublic.get("/stories/random")
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, [axiosPublic]);

    const handleShare = (isLoggedIn) => {
        if (!isLoggedIn) {
            navigate("/login"); // Redirect to login page if not logged in
        }
    };

    const handleAllStories = () => {
        navigate("/all-stories"); // Redirect to All Stories page
    };

    const handleAddStories = () => {
        navigate("/add-story"); // Redirect to Add Stories page
    };

    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Tourist Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stories.map(story => (
                        <div key={story._id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded" />
                            <h3 className="text-xl font-semibold mt-4">{story.title}</h3>
                            <p className="text-gray-600 mt-2">{story.description.slice(0, 100)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <FacebookShareButton
                                    url={`https://yourwebsite.com/stories/${story._id}`}
                                    quote={story.title}
                                    onClick={() => handleShare(true)} // Pass the user's login status
                                >
                                    <button className="btn btn-primary px-4 py-2">Share</button>
                                </FacebookShareButton>
                                <button
                                    onClick={() => navigate(`/story/${story._id}`)}
                                    className="btn btn-secondary px-4 py-2"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                    <button onClick={handleAllStories} className="btn btn-info px-6 py-2">All Stories</button>
                    <button onClick={handleAddStories} className="btn btn-success px-6 py-2">Add Story</button>
                </div>
            </div>
        </div>
    );
};

export default TouristStory;