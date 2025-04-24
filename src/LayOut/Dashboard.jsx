import { useEffect, useState } from "react";
import { NavLink, Outlet, } from "react-router-dom";
import {
    FaBars,
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaClipboardList,
    FaAsterisk,
    FaUsers,
    FaBoxOpen,
    FaPlusCircle,
    FaShoppingCart,
    FaUserTie,
    FaAllergies,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Swal from "sweetalert2"; // Import SweetAlert2
import AuthContext from "../Context/AuthContext";


const SidebarItem = ({ to, icon: Icon, label }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "text-white font-bold flex items-center gap-2 p-2 rounded bg-gray-500"
                    : "text-white flex items-center gap-2 p-2 rounded hover:bg-gray-600"
            }
        >
            <Icon />
            {label}
        </NavLink>
    </li>
);

SidebarItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
};

const DashBoard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };



    return (
        <div>

            <div className="font-primary">
                <div className="flex h-screen">
                    {/* Toggle Button for Mobile */}
                    <button
                        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1C5253] text-white p-2 rounded-full shadow-md"
                        onClick={toggleSidebar}
                    >
                        <FaBars size={20} />
                    </button>

                    {/* Sidebar */}
                    <div
                        className={`lg:w-1/6 w-64 bg-[#1C5253] text-white p-4 h-full fixed lg:static z-40 transition-all duration-300 ${isSidebarOpen ? "left-0" : "-left-64"
                            }`}
                    >
                        {/* QuickCart Title with Logo and Jump Animation */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0], // Jump effect: moves up and then comes back down
                                scale: [1, 1.1, 1], // Slight scale-up effect while jumping
                            }}
                            transition={{
                                repeat: Infinity, // Repeats the animation infinitely
                                duration: 5, // Duration of each jump cycle
                                ease: "easeInOut", // Smooth easing
                            }}
                            whileHover={{ scale: 1.1 }} // Slight hover effect to scale the text
                            className="text-center mb-4 flex items-center justify-center gap-2"
                        >
                            <h2 className="-ml-4 font-bold text-white">𝑸𝒖𝒊𝒄𝒌𝑪𝒂𝒓𝒕-𝑩𝑫</h2>
                        </motion.div>

                        <ul className="menu text-white">


                            <>
                                <SidebarItem to="/dashboard/all-Request" icon={FaAllergies} label="All Request" />
                                <SidebarItem to="/dashboard/manage-users" icon={FaUsers} label="" />
                                <SidebarItem to="/dashboard/seller-data" icon={FaHome} label="Seller Data" />
                                <SidebarItem to="/" icon={FaUserTie} label="Home" />
                                <div className="divider"></div>
                            </>




                        </ul>
                    </div>

                    {/* Dashboard Content */}
                    <div className="flex-1 p-8 overflow-auto bg-white">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
