
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useContext, useState } from 'react';
import AUthContext from '../../../Context/AUthContext';
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddStory = () => {
    const {user}=useContext(AUthContext);
    const axiosPublic=useAxiosPublic();
    const axiosSecure=useAxiosSecure();
    const { register, handleSubmit,reset } = useForm()

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // Capture selected files
    };

    const onSubmit = async (data) => {
        if (!selectedFiles || selectedFiles.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Images Selected",
                text: "Please select at least one image to upload.",
            });
            return;
        }

        const imageUrls = [];
        for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
                if (res.data.success) {
                    imageUrls.push(res.data.data.display_url); // Collect image URLs
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                Swal.fire({
                    icon: "error",
                    title: "Image Upload Failed",
                    text: `Could not upload image ${file.name}.`,
                });
            }
        }

        if (imageUrls.length > 0) {
            const story = {
                title: data.title,
                description: data.description,
                images: imageUrls, // Save all image URLs
                author: user?.displayName || "Anonymous",
                email:user?.email,
                createdAt: new Date(),
            };

            try {
                const storyRes = await axiosSecure.post("/stories", story);
                if (storyRes.data.insertedId) {
                    reset();
                    setSelectedFiles([]);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Story added successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error("Error saving story:", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to Save Story",
                    text: "Something went wrong while saving your story.",
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "No Images Uploaded",
                text: "Please upload at least one image for your story.",
            });
        }

        console.log(data.images);
     console.log([...data.images]); 
    };

    return (
        <div>
            <div></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full p-5 ">
                        <div className="label">
                            <span className="label-text">Title</span>

                        </div>
                        <input type="text"
                            {...register('title',{required:true})}
                            
                            placeholder="A story title" className="input input-bordered w-full " />

                    </label>

                    <label className="form-control p-5">
                        <div className="label">
                            <span className="label-text">Story description</span>
                           
                        </div>
                        <textarea {...register('description',{required:true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                        
                    </label>

                    <input {...register("images", { required: true })}
                        type="file"
                        multiple 
                        onChange={handleFileChange} 
                        className="file-input w-full max-w-xs px-5" />

                    <button className='btn ml-5 my-3'> Post Story</button>
                </form>
            </div>
        </div>
    );
};

export default AddStory;