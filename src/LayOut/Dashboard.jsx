import { useEffect, useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaUserTie,
    FaSignOutAlt,
    FaAllergies,
    FaUser,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";

// Sidebar Item Component
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
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // ⛳ Dashboard এ ঢুকলেই all-request পেইজে রিডিরেক্ট করাবে
    useEffect(() => {
        navigate("/dashboard/all-Request");
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1C5253',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout(); // context থেকে logout call
                Swal.fire(
                    'Logged Out!',
                    'You have been logged out successfully.',
                    'success'
                ).then(() => {
                    navigate("/"); // ✅ হোমপেজে রিডিরেক্ট
                });
            }
        });
    };

    return (
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
                    {/* Logo & Title */}
                    <motion.div
                        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        whileHover={{ scale: 1.1 }}
                        className="text-center mb-4 flex items-center justify-center gap-2"
                    >
                        <h2 className="-ml-4 font-bold text-white">Dashboard</h2>
                    </motion.div>

                    {/* Sidebar Links */}
                    <ul className="menu text-white">
                        <SidebarItem to="/dashboard/all-Request" icon={FaAllergies} label="All Request" />
                        <SidebarItem to="/dashboard/profile" icon={FaUser} label="Profile" />
                        <SidebarItem to="/" icon={FaUserTie} label="Home" />
                        <div className="divider"></div>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-white flex items-center gap-2 p-2 rounded hover:bg-red-600 w-full text-left"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-auto bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
