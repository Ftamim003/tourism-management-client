
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { TabList, TabPanel, Tabs, Tab } from "react-tabs";
import TouristStory from "./TouristStory";
import Events from "./Events";
import PopularDestination from "./PopularDestination";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "./WhyChooseUs";
import FAQ from "./FAQ";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [packages, setPackages] = useState([]);
    const [guides, setGuides] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/random-packages')
            .then(response => setPackages(response.data))
            .catch(error => console.error('Error fetching packages:', error));
    }, [axiosPublic]);

    useEffect(() => {
        axiosPublic.get('/random-guides')
            .then(response => setGuides(response.data))
            .catch(error => console.error('Error fetching guides:', error));
    }, []);

    const handleRedirect = () => {
        console.log("Redirect to details page");
    };
    
        useEffect(() => {
            AOS.init({ duration: 1000 });
        }, []);
        
    return (
        <div>
            <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="w-full h-72 lg:h-96"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co.com/9N7zN2x/sunadarban.jpg"
                            alt="Explore Sundarbans"
                            className="w-full h-72 md:h-96 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
                        <div className="absolute top-1/3 left-5 md:left-16 text-white z-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                                Explore the green of Bangladesh

                            </h1>
                            <p className="mb-4 text-gray-300">
                                The largest mangrove forest awaits you.
                            </p>
                            <button
                                onClick={handleRedirect}
                                className="btn btn-primary px-4 py-2 rounded"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co.com/JFWwVnZ/cox-s-bazar.webp"
                            alt="Explore Sundarbans"
                            className="w-full h-72 md:h-96 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
                        <div className="absolute top-1/3 left-5 md:left-16 text-white z-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                                Explore the Beauty of Cox's Bazar

                            </h1>
                            <p className="mb-4 text-gray-300">
                                The largest mangrove forest awaits you.
                            </p>
                            <button
                                onClick={handleRedirect}
                                className="btn btn-primary px-4 py-2 rounded"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://i.ibb.co.com/7XGqRBv/newbandarban.webp"
                            alt="Explore Sundarbans"
                            className="w-full h-72 md:h-96 lg:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
                        <div className="absolute top-1/3 left-5 md:left-16 text-white z-10">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                                Explore the Beauty of Bandarban

                            </h1>
                            <p className="mb-4 text-gray-300">
                                The largest sea beach in the world.
                            </p>
                            <button
                                onClick={handleRedirect}
                                className="btn btn-primary px-4 py-2 rounded"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


            <div className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4" data-aos="fade-down">
                        Welcome to Our Platform
                    </h2>
                    <p className="text-gray-600 text-lg" data-aos="fade-down" data-aos-delay="200">
                        Explore what our website has to offer through an engaging video experience.
                    </p>
                </div>
                <div className="container mx-auto px-4 sm:px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Video 1 */}
                        <div 
                            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" 
                            data-aos="zoom-in" 
                            data-aos-delay="300"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <iframe
                                    className="w-full h-64 md:h-72 lg:h-80"
                                    src="https://www.youtube.com/embed/j5L1M7rDbL0?si=iZ6KtggUq1ptmn7y"
                                    title="Scenic Beauty of Bandarban"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        </div>

                        {/* Video 2 */}
                        <div 
                            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" 
                            data-aos="zoom-in" 
                            data-aos-delay="500"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <iframe
                                    className="w-full h-64 md:h-72 lg:h-80"
                                    src="https://www.youtube.com/embed/yzASVQShs6I?si=tAmBmsmcACAPbQvR"
                                    title="Beautiful Cox's Bazar Guide"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


            <div className="container mx-auto py-10 px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Tourism and Travel Guide</h2>
                <Tabs>
                    <TabList className="flex justify-center gap-8 text-lg font-semibold">
                        <Tab className="cursor-pointer px-4 py-2 hover:text-blue-600">Our Packages</Tab>
                        <Tab className="cursor-pointer px-4 py-2 hover:text-blue-600">Meet Our Tour Guides</Tab>
                    </TabList>

                    {/* Our Packages Tab */}
                    <TabPanel>
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
                                            onClick={() => navigate(`/packages/${pkg._id}`)}
                                            className="btn btn-primary mt-4"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    {/* Meet Our Tour Guides Tab */}
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {guides.map((guide) => (
                                <div key={guide._id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
                                    <img src={guide.profilePicture} alt={guide.name} className=" h-48 " />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold">{guide.name}</h3>
                                        <p className="text-gray-600">Expertise: {guide.expertise}</p>
                                        <button
                                            onClick={() => window.location.href = `/tourGuide/${guide._id}`}
                                            className="btn btn-primary mt-4"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <TouristStory></TouristStory>
            <WhyChooseUs></WhyChooseUs>
            <Events></Events>
            <PopularDestination></PopularDestination>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;