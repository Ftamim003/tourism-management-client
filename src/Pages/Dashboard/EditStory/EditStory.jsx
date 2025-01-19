
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditStory = () => {
  const { id } = useParams(); // Story ID from route
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();

  // Fetch Story Data
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axiosSecure.get(`/stories/${id}`);
        setStory(res.data);
        reset(res.data); // Pre-fill form with story data
      } catch (error) {
        console.error("Error fetching story:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Load Story",
          text: "Something went wrong while fetching the story details.",
        });
      }
    };
    fetchStory();
  }, [id, axiosSecure, reset]);

  // Handle Form Submit
  const onSubmit = async (data) => {
    const newImages = data.newImages; // Newly uploaded images
    const newImageUrls = [];

    // Upload new images to ImgBB
    if (newImages?.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        const formData = new FormData();
        formData.append("image", newImages[i]);
        try {
          const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });
          if (res.data.success) {
            newImageUrls.push(res.data.data.display_url);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    }

    // Update story data
    const updatedStory = {
      title: data.title,
      description: data.description,
      newImages: newImageUrls,
    };

    try {
      const res = await axiosSecure.put(`/stories/${id}`, updatedStory);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Story updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manageStories");
      }
    } catch (error) {
      console.error("Error updating story:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Story",
        text: "Something went wrong while updating your story.",
      });
    }
  };

  // Remove an Image
  const removeImage = async (imageUrl) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This image will be removed from the story.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/stories/${id}/remove-image`, { imageUrl });
          if (res.data.modifiedCount > 0) {
            setStory((prev) => ({
              ...prev,
              images: prev.images.filter((img) => img !== imageUrl),
            }));
            Swal.fire("Removed!", "The image has been removed.", "success");
          }
        } catch (error) {
          console.error("Error removing image:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to Remove Image",
            text: "Something went wrong while removing the image.",
          });
        }
      }
    });
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Edit Story</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control mb-5">
          <span className="label-text">Title</span>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control mb-5">
          <span className="label-text">Description</span>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </label>

        <div className="mb-5">
          <h3 className="font-bold mb-3">Current Images</h3>
          <div className="grid grid-cols-3 gap-2">
            {story.images.map((img) => (
              <div key={img} className="relative">
                <img src={img} alt="Story" className="w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <label className="form-control mb-5">
          <span className="label-text">Add New Images</span>
          <input type="file" multiple {...register("newImages")} className="file-input w-full" />
        </label>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStory;
