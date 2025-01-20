import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="items-center gap-10 justify-center footer bg-neutral text-neutral-content p-10">
                <aside>
                   
                    <p>
                         <span className="text-2xl">TravelMint</span>
                        <br />
                        A place to find your destination
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Find Us on</h6>
                    <div className="grid grid-flow-col gap-4">
                    <a href="https://www.facebook.com/fozlullah.tamim.3/" target="_blank" rel="noopener noreferrer" className="flex items-center link link-hover">
                        <FaFacebook className="text-2xl text-blue-400 mr-2"></FaFacebook>
                        Facebook
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center link link-hover">
                        
                        <FaInstagram className="text-2xl text-pink-400 mr-2"></FaInstagram>
                        Instagram
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center link link-hover">
                        <FaLinkedin className="text-2xl text-blue-500 mr-2"></FaLinkedin>
                         Linkedin
                    </a>
                    </div>
                </nav>
            </footer>
            <footer className="footer bg-neutral footer-center text-base-content p-4">
                <aside>
                    <p className="text-white">Copyright © {new Date().getFullYear()} - All right reserved by Fazlullah Tamim</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;