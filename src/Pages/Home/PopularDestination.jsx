import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularDestination = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const destinations = [
        { id: 1, name: "Cox's Bazar", image: "https://i.ibb.co/zbxLZn9/Popucox.jpg", description: "The world's longest unbroken beach." },
        { id: 2, name: "Sundarbans", image: "https://i.ibb.co/kckRKYg/popu-SUndarban.jpg", description: "The largest mangrove forest in the world." },
        { id: 3, name: "Saint Martin's Island", image: "https://i.ibb.co/0VBVWLj/popu-Saint.jpg", description: "A tropical paradise in the Bay of Bengal." },
        { id: 4, name: "Bandarban", image: "https://i.ibb.co/RCT7Bx2/popubandarban.jpg", description: "The hill district with stunning landscapes." },
    ];

    return (
        <div className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6" data-aos="fade-down">Popular Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, index) => (
                        <div 
                            key={dest.id} 
                            className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={index * 200} // Staggered effect
                        >
                            <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{dest.name}</h3>
                                <p className="text-gray-600 text-sm">{dest.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularDestination;
