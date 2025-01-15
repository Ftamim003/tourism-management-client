import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Footer from "../../Pages/Shared/Footer/Footer";

const Main = () => {
    const location=useLocation();
    const noHeaderFooter= location.pathname.includes('login')
    return (
        <div className="min-h-screen">
            {noHeaderFooter || <Navbar></Navbar>}
            <div className="relative pt-24 min-h-[calc(100vh-200px)] md:min-h-[calc(100vh-230px)] w-11/12 mx-auto">
            <Outlet></Outlet>
            </div>
           {noHeaderFooter|| <Footer></Footer>}
        </div>
    );
};

export default Main;