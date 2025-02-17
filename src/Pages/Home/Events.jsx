import { useState } from "react";

import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Events = () => {
    const axiosPublic = useAxiosPublic();
    const events = [
        { id: 1, name: "Bichanakandi Trekking", date: "2025-03-05", location: "Sylhet", description: "Experience the serenity of Bichanakandi.", image: "https://i.ibb.co.com/7bdc38g/bichanakandi.webp" },
        { id: 2, name: "Sundarbans Wildlife Safari", date: "2025-03-12", location: "Khulna", description: "Explore the rich wildlife of Sundarbans.", image: "https://i.ibb.co.com/z7NZGJP/wild.jpg" },
        { id: 3, name: "Rangamati Cultural Fest", date: "2025-03-25", location: "Rangamati", description: "Celebrate the vibrant culture of the Chittagong Hill .", image: "https://i.ibb.co.com/b6sChRv/culter.jpg" },
    ];

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", contact: "" });

    const openModal = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setFormData({ name: "", email: "", contact: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.contact) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axiosPublic.post("/event-registrations", {
                ...formData,
                // eventId: selectedEvent.id,
                // eventName: selectedEvent.name,
                // eventDate: selectedEvent.date,
                // eventLocation: selectedEvent.location,
            });

            if (response.status === 201) {
                Swal.fire({
                    title: "Registration successful!",
                    icon: "success",
                    draggable: true
                  });
                closeModal();
            }
        } catch (error) {
            console.error("Error registering for event:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
               
              });
        }
    };

    return (
        <div className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{event.name}</h3>
                                <p className="text-gray-600">{event.date} | {event.location}</p>
                                <p className="text-gray-600 text-sm mt-2">{event.description}</p>
                                <button onClick={() => openModal(event)} className="btn btn-primary mt-4">
                                    Register Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-bold mb-4">Register for {selectedEvent.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 mb-3 border rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 mb-3 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="contact"
                                placeholder="Your Contact Number"
                                value={formData.contact}
                                onChange={handleChange}
                                className="w-full p-2 mb-3 border rounded"
                                required
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button type="button" onClick={closeModal} className="btn btn-danger">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
