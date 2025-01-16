
const PopularDestination = () => {
    const destinations = [
        { id: 1, name: "Cox's Bazar", image: "https://i.ibb.co.com/zbxLZn9/Popucox.jpg", description: "The world's longest unbroken beach." },
        { id: 2, name: "Sundarbans", image: "https://i.ibb.co.com/kckRKYg/popu-SUndarban.jpg", description: "The largest mangrove forest in the world." },
        { id: 3, name: "Saint Martin's Island", image: "https://i.ibb.co.com/0VBVWLj/popu-Saint.jpg", description: "A tropical paradise in the Bay of Bengal." },
        { id: 4, name: "Bandarban", image: "https://i.ibb.co.com/RCT7Bx2/popubandarban.jpg", description: "The hill district with stunning landscapes." },
    ];

    return (
        <div className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Popular Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest) => (
                        <div key={dest.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                            <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{dest.name}</h3>
                                <p className="text-gray-600 text-sm">{dest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <button className="btn btn-primary px-6 py-2">View More</button>
                </div>
            </div>
        </div>
    );
};
export default PopularDestination