import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../src/assets/Lottie/Register.json';
import 'animate.css'; 
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import AuthContext from '../Context/AuthContext';
import GoogleLogin from '../Shared/GoogleLogin';
import Swal from 'sweetalert2'; // SweetAlert2 import

const Login = () => {
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location=useLocation()
    const from=location.state||'/'

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const rememberMe = form.rememberMe.checked;

        if (!rememberMe) {
            // Show SweetAlert2 if "Remember Me" is not checked
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: "Please check the 'Remember Me' checkbox to proceed.",
                confirmButtonText: 'Okay'
            });
            return;
        }

        logIn(email, password)
            .then((result) => {
                console.log(result.user);
                if (rememberMe) {
                    // Save the user data in localStorage for persistent login
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userPassword', password);
                } else {
                    // Clear the saved data if "Remember Me" is not checked
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userPassword');
                }

                // SweetAlert2 success message
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully!',
                    text: 'Welcome back!',
                    confirmButtonText: 'Okay'
                }).then(() => {
                    navigate(from); // Navigate to Home page on successful login
                });
            })
            .catch((error) => {
                console.log(error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password.',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8  w-full max-w-4xl lg:w-3/4 flex flex-col lg:flex-row items-center animate__animated animate__fadeIn animate__delay-1s">
                {/* Lottie animation on the left side for lg screens */}
                <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex justify-center">
                    <Lottie 
                        animationData={animationData} 
                        loop={true} 
                        className="w-full lg:w-3/4 sm:w-1/2"
                    />
                </div>

                {/* Login form on the right side */}
                <div className="lg:w-1/2 w-full">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center animate__animated animate__flipInX animate__delay-3s">
                        Login Now
                    </h2>
                    <form onSubmit={handleLogin} className="w-full">
                        {/* Email Field */}
                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-2 block bg-gray-100 w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 sm:mb-8">
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-2 block bg-gray-100 w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center mb-6 sm:mb-8">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="mr-3 h-5 w-5 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="text-lg text-gray-700">
                                Remember Me
                            </label>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 animate__animated animate__bounce animate__delay-4s"
                        >
                            Login
                        </button>
                        <GoogleLogin />
                    </form>

                    {/* Forgot Password Option */}
                    <div className="w-full mt-6 text-center">
                        <NavLink to="/forgot-password" className="text-lg text-blue-500 hover:underline">
                            Forgot Password?
                        </NavLink>
                    </div>

                    <p className="text-gray-600 mt-6 text-lg animate__animated animate__lightSpeedInRight animate__delay-5s text-center">
    Don’t have an account?{' '}
    <NavLink to="/register" className="text-blue-500 hover:underline">
        Register here
    </NavLink>
</p>

                </div>
            </div>
        </div>
    );
};

export default Login;
