

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import AUthContext from "../../../Context/AUthContext";

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AUthContext);
  // Fetch all stories
  const fetchStories = async () => {
    try {
      const res = await axiosSecure.get(`/stories?email=${user.email}`); 
      setStories(res.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Stories",
        text: "Something went wrong while fetching stories.",
      });
    }
  };

  // Delete story
  const handleDelete = async (storyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/stories/${storyId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "The story has been deleted.", "success");
            fetchStories(); // Refresh stories
          }
        } catch (error) {
          console.error("Error deleting story:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to Delete Story",
            text: "Something went wrong while deleting the story.",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">My Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stories.map((story) => (
          <div key={story._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={story?.images?.[0]  || "https://via.placeholder.com/150"} // Display the first image as a preview
                alt={story?.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{story?.title}</h2>
              <p>{story.description}</p>
              <div className="flex gap-3 mt-3">
                <Link
                  to={`/dashboard/edit-story/${story._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
