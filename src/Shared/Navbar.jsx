import { useContext, useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import logo from "../../src/assets/logo/logo.jpg";

// Reusable Links component
const Links = () => (
  <>
    <li>
      <NavLink to="/" className="hover:text-[#B5AD3C] font-bold text-white transition-all">Home</NavLink>
    </li>
    <li>
      <NavLink to="/allPosts" className="hover:text-[#B5AD3C] font-bold text-white transition-all">
        All Volunteer Need Posts
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard" className="hover:text-[#B5AD3C] font-bold text-white transition-all">
        Dashboard
      </NavLink>
    </li>
  </>
);

// Reusable ProfileDropdown
const ProfileDropdown = ({ onClose, onLogout }) => (
  <ul className="p-2 mt-2 bg-[#2D3748] text-[#E2E8F0] rounded-lg shadow-lg">
    <li><NavLink to="/add-post" onClick={onClose}>Add Post</NavLink></li>
    <li><NavLink to="/manage-posts" onClick={onClose}>Manage Posts</NavLink></li>
    <li><NavLink to="/edit-profile" onClick={onClose}>Edit Profile</NavLink></li>
    <li><button onClick={onLogout}>Logout</button></li>
  </ul>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();
  const profileRefMobile = useRef();
  const profileRefDesktop = useRef();

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
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const handleThemeChange = (e) => setIsDarkTheme(e.target.checked);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (profileRefMobile.current && !profileRefMobile.current.contains(event.target)) &&
        (profileRefDesktop.current && !profileRefDesktop.current.contains(event.target))
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar w-full bg-[#1C5253] shadow-lg sticky top-0 z-50 max-w-screen-xl mx-auto px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul className={`menu menu-sm dropdown-content bg-[#1C5253] text-white rounded-lg z-10 mt-3 w-52 p-3 shadow-lg transition-all duration-300 ease-in-out ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <Links />
            {user && (
              <li ref={profileRefMobile}>
                <button onClick={toggleProfileDropdown} className="text-white flex items-center hover:text-[#B5AD3C]">
                  {user?.photoURL ? (
                    <img src={user?.photoURL} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  ) : (
                    <FaUserCircle className="text-2xl mr-2" />
                  )}
                  My Profile
                </button>
                {isProfileDropdownOpen && (
                  <ProfileDropdown onClose={() => setIsProfileDropdownOpen(false)} onLogout={handleLogout} />
                )}
              </li>
            )}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl text-white font-bold">
          <img src={logo} alt="Logo" className="w-12 h-12 border-[#B5AD3C] border-2 rounded-full" />
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white gap-4">
          <Links />
          {user && (
            <li className="relative" ref={profileRefDesktop}>
              <button onClick={toggleProfileDropdown} className="text-white flex items-center hover:text-[#B5AD3C]">
                {user?.photoURL ? (
                  <img src={user?.photoURL} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                ) : (
                  <FaUserCircle className="text-2xl mr-2" />
                )}
                My Profile
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute left-0 top-full">
                  <ProfileDropdown onClose={() => setIsProfileDropdownOpen(false)} onLogout={handleLogout} />
                </div>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {/* 
        Optional Theme Toggle:
        <label className="cursor-pointer hidden sm:flex items-center text-white mr-2">
          <span className="mr-2">Dark Mode</span>
          <input
            type="checkbox"
            className="toggle toggle-sm"
            onChange={handleThemeChange}
            checked={isDarkTheme}
          />
        </label>
        */}
        {user ? (
          <button
            onClick={handleLogout}
            className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] border-[#B5AD3C] text-sm px-4 py-1.5 rounded-full font-semibold"
          >
            Log out
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] border-[#B5AD3C] text-sm px-4 py-1.5 rounded-full font-semibold"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn bg-[#1C5253] text-white hover:bg-[#1A3D3A] border-[#B5AD3C] text-sm px-4 py-1.5 rounded-full font-semibold"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
