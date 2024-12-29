import { useContext, useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);  // Track theme state
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
        <div className="navbar bg-[#1C5253] shadow-lg rounded-b-xl">
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
                                    onClick={toggleDropdown}
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
                                {isDropdownOpen && (
                                    <ul className="p-2 absolute left-0 top-full bg-base-200 rounded-lg shadow-lg z-20">
                                        <li>
                                            <NavLink to="/add-post" className="hover:text-[#1C5253]">
                                                Add Volunteer Need Post
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/manage-posts" className="hover:text-[#1C5253]">
                                                Manage My Posts
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/edit-profile" className="hover:text-[#1C5253]">
                                                Edit Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="hover:text-[#1C5253] transition-all px-4 py-2 bg-white text-[#1C5253] rounded-md w-full"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                        {/* Theme Toggle */}
                                        <label className="flex cursor-pointer gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="5" />
                                                <path
                                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                                                />
                                            </svg>
                                            <input
                                                type="checkbox"
                                                checked={isDarkTheme}
                                                onChange={handleThemeChange}
                                                className="toggle theme-controller"
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                            </svg>
                                        </label>
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <NavLink
                    to="/"
                    className="btn btn-ghost text-xl font-bold text-white tracking-wider uppercase"
                >
                    Volunteer Management
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Links />
                    {user && (
                        <li className="relative">
                            <button
                                onClick={toggleDropdown}
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
                            {isDropdownOpen && (
                                <ul className="p-2 absolute left-0 top-full bg-base-200 rounded-lg shadow-lg z-20">
                                    <li>
                                        <NavLink to="/add-post" className="hover:text-[#1C5253]">
                                            Add Volunteer Need Post
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/manage-posts" className="hover:text-[#1C5253]">
                                            Manage My Posts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/edit-profile" className="hover:text-[#1C5253]">
                                            Edit Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="hover:text-[#1C5253] transition-all px-4 py-2 bg-white text-[#1C5253] rounded-md w-full"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                    {/* Theme Toggle */}
                                    <label className="flex cursor-pointer gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="5" />
                                            <path
                                                d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                                            />
                                        </svg>
                                        <input
                                            type="checkbox"
                                            checked={isDarkTheme}
                                            onChange={handleThemeChange}
                                            className="toggle theme-controller"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </svg>
                                    </label>
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
                        className="btn bg-[#1C5253] text-white hover:bg-[#1C5253] transition-all text-sm px-3 py-2"
                    >
                        Log out
                    </button>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="btn bg-[#1C5253] text-white hover:bg-[#1C5253] transition-all text-sm px-3 py-2"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn bg-[#1C5253] text-white hover:bg-[#1C5253] transition-all text-sm px-3 py-2"
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
