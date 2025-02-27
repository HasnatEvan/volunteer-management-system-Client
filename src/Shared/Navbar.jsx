import { useContext, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import logo from '../../src/assets/logo/logo.jpg';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Profile dropdown state
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Track theme state
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Successfully logged out");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Failed to log out", error);
            });
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen); // Toggle profile dropdown

    // Toggle theme when checkbox is clicked
    const handleThemeChange = (e) => {
        setIsDarkTheme(e.target.checked);
    };

    useEffect(() => {
        if (isDarkTheme) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [isDarkTheme]);

    const Links = () => (
        <>
            <li>
                <NavLink to="/" className="hover:text-[#1C5253] font-bold transition-all">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allPosts"
                    className="hover:text-[#1C5253] font-bold text-[10px] text-white transition-all"
                >
                    All Volunteer Need Posts
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-[#1C5253] max-w-screen-xl mx-auto shadow-lg sticky top-0 z-50">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Menu */}
                <div className="dropdown lg:hidden">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost"
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen ? "true" : "false"}
                        onClick={toggleDropdown}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </button>
                    <ul
                        tabIndex={0}
                        className={`menu menu-sm dropdown-content bg-[#1C5253] rounded-lg z-10 mt-3 w-52 p-3 shadow-lg transition-all ${isDropdownOpen ? 'block' : 'hidden'}`}
                    >
                        <Links />
                        {user && (
                            <li className="relative">
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="hover:text-[#1C5253] text-white transition-all flex items-center"
                                    title={user?.displayName || "My Profile"}
                                >
                                    {user?.photoURL ? (
                                        <img
                                            src={user?.photoURL}
                                            alt={user?.displayName || "User Avatar"}
                                            className="mr-2 w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <FaUserCircle className="mr-2 text-2xl text-white" />
                                    )}
                                    My Profile
                                </button>
                                {isProfileDropdownOpen && (
                                    <ul className="p-2 absolute left-0 top-full bg-[#2D3748] text-[#E2E8F0] rounded-lg shadow-lg z-20">
                                        <li>
                                            <NavLink
                                                to="/add-post"
                                                className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                                onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                            >
                                                Add Volunteer Need Post
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/manage-posts"
                                                className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                                onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                            >
                                                Manage My Posts
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/edit-profile"
                                                className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                                onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                            >
                                                Edit Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <NavLink
                    to="/"
                    className="btn btn-ghost flex items-center gap-2 text-xl font-bold text-white tracking-wider uppercase"
                >
                    <img
                        src={logo}
                        alt="Volunteer Management Logo"
                        className="w-12 h-12 border-[#B5AD3C] border-2 rounded-full"
                    />
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Links />
                    {user && (
                        <li className="relative">
                            <button
                                onClick={toggleProfileDropdown}
                                className="hover:text-[#1C5253] transition-all flex items-center"
                                title={user?.displayName || "My Profile"}
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.displayName || "User Avatar"}
                                        className="mr-2 w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <FaUserCircle className="mr-2 text-2xl text-white" />
                                )}
                                My Profile
                            </button>
                            {isProfileDropdownOpen && (
                                <ul className="p-2 absolute left-0 top-full bg-[#2D3748] text-[#E2E8F0] rounded-lg shadow-lg z-20">
                                    <li>
                                        <NavLink
                                            to="/add-post"
                                            className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                            onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                        >
                                            Add Volunteer Need Post
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/manage-posts"
                                            className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                            onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                        >
                                            Manage My Posts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/edit-profile"
                                            className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                            onClick={() => setIsProfileDropdownOpen(false)} // Close dropdown when clicked
                                        >
                                            Edit Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block px-4 py-2 hover:bg-[#1C5253] hover:text-white transition-all rounded"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end">
                {user ? (
                    <button
                        onClick={handleLogout}
                        className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] border-[#B5AD3C] transition-all text-sm px-4 py-1.5 rounded-full font-semibold"
                    >
                        Log out
                    </button>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] border-[#B5AD3C] transition-all text-sm px-4 py-1.5 rounded-full font-semibold"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] transition-all border-[#B5AD3C] text-sm px-4 py-1.5 rounded-full font-semibold"
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
