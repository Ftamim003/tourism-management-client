import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";


const AllTrips = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();
    const axiosPublic=useAxiosPublic();
     useEffect(() => {
            axiosPublic.get('/packages')
                .then(response => setPackages(response.data))
                .catch(error => console.error('Error fetching packages:', error));
        }, [axiosPublic]);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {packages.map((pkg) => (
            <div key={pkg._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={pkg.images?.[0] || 'https://via.placeholder.com/300x200'} // Fallback to a placeholder
                    alt={pkg.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{pkg.title}</h3>
                    <p className="text-gray-600">{pkg.type}</p>
                    <p className="text-lg font-bold text-blue-500">${pkg.price}</p>
                    <button
                        onClick={() =>  navigate(`/packages/${pkg._id}`)}
                        className="btn btn-primary mt-4"
                    >
                        View Details
                    </button>
                </div>
            </div>
        ))}
    </div>
    );
};

export default AllTrips;