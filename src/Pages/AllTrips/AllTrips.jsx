import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const AllTrips = () => {
    const [packages, setPackages] = useState([]);
    const [sortedPackages, setSortedPackages] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc"); // State for tracking sort order
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/packages')
            .then(response => {
                setPackages(response.data);
                setSortedPackages(response.data); // Set sorted packages initially
            })
            .catch(error => console.error('Error fetching packages:', error));
    }, [axiosPublic]);

    // Sorting function
    const handleSort = (order) => {
        setSortOrder(order);
        const sortedData = [...packages].sort((a, b) => {
            if (order === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setSortedPackages(sortedData);
    };

    return (
        <div className="container  mx-auto px-4 mt-8">
            <div className="flex justify-center items-center mb-6 gap-1">
                <button 
                    onClick={() => handleSort("asc")} 
                    className="btn bg-white"
                >
                    Sort by Price (Ascending)
                </button>
                <button 
                    onClick={() => handleSort("desc")} 
                    className="btn bg-white"
                >
                    Sort by Price (Descending)
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {sortedPackages.map((pkg) => (
        <div 
            key={pkg._id} 
            className="card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
        >
            <img 
                src={pkg.images?.[0] || 'https://via.placeholder.com/300x200'} // Fallback to a placeholder
                alt={pkg.title} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold">{pkg.title}</h3>
                <p className="text-gray-600">{pkg.type}</p>
                <p className="text-lg font-bold text-blue-500">${pkg.price}</p>
                <div className="mt-auto">
                    <button
                        onClick={() => navigate(`/packages/${pkg._id}`)}
                        className="btn btn-primary mt-4 w-full"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    ))}
</div>

        </div>
    );
};

export default AllTrips;
