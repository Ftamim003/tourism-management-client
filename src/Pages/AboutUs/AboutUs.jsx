import React from "react";

const AboutUs = () => {
    return (
        <div className="container mx-auto py-12 px-6">
            {/* Header Section */}
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-700">About Me</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Hi, I'm Tamim, a passionate junior web developer, constantly learning and exploring the world of web technologies. I’ve built various engaging and functional projects that reflect my growing expertise in development.
                </p>
            </section>

            {/* Skills Section */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        ReactJS
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        TailwindCSS
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        DaisyUI
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        Firebase
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        MongoDB
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        NodeJS
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        JWT Authentication
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg shadow">
                        Responsive Design
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Visa Navigator */}
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co.com/XFGMsmw/Capture3.jpg"
                            alt="Visa Navigator"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Visa Navigator</h3>
                            <p className="text-gray-600">
                                A web portal for managing visa information, applications, and tracking.
                            </p>
                            <a
                                href="https://glittering-donut-f87b9f.netlify.app"
                                className="btn btn-primary mt-4"
                            >
                                View Project
                            </a>
                        </div>
                    </div>

                    {/* Hotel Booking Platform */}
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co.com/vmWYqqt/Capture2.jpg"
                            alt="Hotel Booking Platform"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Hotel Booking Platform</h3>
                            <p className="text-gray-600">
                                Discover and book hotel rooms with features like JWT authentication and reviews.
                            </p>
                            <a
                                href="https://modern-hotel-booking.web.app/"
                                className="btn btn-primary mt-4"
                            >
                                View Project
                            </a>
                        </div>
                    </div>

                    {/* Language Learning Website */}
                    <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co.com/cg51X2N/Capture4.jpg"
                            alt="Language Learning Website"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Language Learning Website</h3>
                            <p className="text-gray-600">
                                A rich platform for enhancing vocabulary and listening skills with audio pronunciation and engaging tools.
                            </p>
                            <a
                                href="https://merry-cranachan-78aeb0.netlify.app"
                                className="btn btn-primary mt-4"
                            >
                                View Project
                            </a>
                        </div>
                    </div>

                </div>
            </section >

            {/* Contact Section */}
            < section className="text-center" >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-4">
                    Feel free to reach out for collaboration or inquiries!
                </p>
                <a
                    href="mailto:example@email.com"
                    className="btn btn-outline btn-primary"
                >
                    Email Me
                </a>
            </section >
        </div >
    );
};

export default AboutUs;
