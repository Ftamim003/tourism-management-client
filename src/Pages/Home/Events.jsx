

const Events = () => {
    const events = [
        { id: 1, name: "Bichanakandi Trekking", date: "2025-01-25", location: "Sylhet", description: "Experience the serenity of Bichanakandi.", image: "https://i.ibb.co.com/7bdc38g/bichanakandi.webp" },
        { id: 2, name: "Sundarbans Wildlife Safari", date: "2025-02-10", location: "Khulna", description: "Explore the rich wildlife of Sundarbans.", image: "https://i.ibb.co.com/z7NZGJP/wild.jpg" },
        { id: 3, name: "Rangamati Cultural Fest", date: "2025-03-05", location: "Rangamati", description: "Celebrate the vibrant culture of the Chittagong Hill Tracts.", image: "https://i.ibb.co.com/b6sChRv/culter.jpg" },
    ];
    return (
        <div>
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
                                    <button className="btn btn-primary mt-4">Register Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;