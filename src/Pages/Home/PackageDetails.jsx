import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import AUthContext from "../../Context/AUthContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetails = () => {
    const { price, title, images, description, tourPlan ,_id} = useLoaderData();
    const [activeDay, setActiveDay] = useState(null)

    const [tourGuides, setTourGuides] = useState([]);
    const axiosPublic = useAxiosPublic()
    const [bookingData, setBookingData] = useState({
        tourDate: null,
        guideName: '',
    });
    const { user } = useContext(AUthContext);
    const toggleDay = (index) => {
        setActiveDay(activeDay === index ? null : index);
    };

    useEffect(() => {
        axiosPublic.get('/tour-guides')
            .then(response => setTourGuides(response.data))
            .catch(error => console.error('Error fetching tour guides:', error));
    }, [])

    const handleBooking = () => {
        if (!user) {
            navigate('/login'); // Redirect to login if user is not logged in
            return;
        }

        const bookingInfo = {
            packageId: _id,
            packageName: title,
            touristName: user?.displayName,
            touristEmail: user?.email,
            touristImage: user?.photoURL,
            price: price,
            tourDate: bookingData.tourDate,
            guideName: bookingData.guideName,
            status: 'pending',
        };

        // Confirm booking and redirect to My Bookings
        axios.post('/bookings', bookingInfo)
            .then(() => {
                alert('Confirm your Booking');
                navigate('/my-bookings');
            })
            .catch(error => console.error('Error booking package:', error));
    };

    // if () return <div>Loading...</div>;
    return (
        <div>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About The Tour</h2>
                <p className="font-bold">{title}</p>
                <p className="text-gray-700">{description}</p>
            </section>



            {/* Tour plan */}
            <section className="mb-8">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Tour Plan</h2>
                <div className="space-y-4">
                    {tourPlan?.map((plan, index) => (
                        <div key={index} className="collapse collapse-arrow border border-base-300 rounded-lg shadow">
                            {/* Accordion Header */}
                            <input
                                type="checkbox"
                                className="peer"
                                checked={activeDay === index}
                                onChange={() => toggleDay(index)}
                            />
                            <div className="collapse-title text-lg font-semibold bg-blue-100 text-blue-800 peer-checked:bg-blue-200">
                                {`Day ${index + 1}`} - {plan.title}
                            </div>

                            {/* Accordion Content */}
                            <div className="collapse-content bg-white p-4 text-gray-700">
                                <p>{plan.description}</p>
                                {plan.activities?.length > 0 && (
                                    <ul className="list-disc pl-5 mt-2">
                                        {plan.activities.map((activity, i) => (
                                            <li key={i}>{activity}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Tour Guides Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Meet Our Tour Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tourGuides.map((guide) => (
                        <div
                            key={guide._id}
                            onClick={() => navigate(`/tour-guide/${guide._id}`)}
                            className="card bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
                        >
                            <img src={guide.
                                profilePicture} alt={guide.name} className="w-full h-32 object-cover rounded-lg" />
                            <h3 className="text-lg font-semibold mt-2">{guide.name}</h3>
                            <p className="text-gray-600">{guide.expertise}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* User Booking  */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Book Your Tour</h2>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <div className="mb-4">
                        {/* <label className="block text-gray-700 font-semibold mb-2">Tourist Image</label> */}
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="Tourist"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name of the Package</label>
                        <input
                            type="text"
                            value={title}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Tourist Name</label>
                        <input
                            type="text"
                            value={user?.displayName || 'Guest'}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Tourist Email</label>
                        <input
                            type="email"
                            value={user?.email || 'guest@example.com'}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Price</label>
                        <input
                            type="text"
                            value={`Tk. ${price}`}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Tour Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={bookingData.tourDate}
                                onChange={(date) => setBookingData({ ...bookingData, tourDate: date })}
                                className="input input-bordered w-full"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"
                                popperPlacement="bottom" // Ensure dropdown appears below the input
                                popperModifiers={[
                                    {
                                        name: "preventOverflow",
                                        options: {
                                            boundary: "viewport",
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Tour Guide</label>
                        <select
                            value={bookingData.guideName}
                            onChange={(e) => setBookingData({ ...bookingData, guideName: e.target.value })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select a Tour Guide</option>
                            {tourGuides.map((guide) => (
                                <option key={guide._id} value={guide.name}>
                                    {guide.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="btn btn-primary w-full"
                    >
                        Book Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PackageDetails;