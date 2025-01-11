import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import RegisterAnimation from "../../src/assets/Lottie/signUp.json";
import AuthContext from "../Context/AuthContext";
import GoogleLogin from "../Shared/GoogleLogin";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext); // Correct function name here
    const navigate = useNavigate();

    const options = {
        loop: true,
        autoplay: true,
        animationData: RegisterAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const validatePassword = (password) => {
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        const minLength = 6;

        if (!uppercase.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password Error!",
                text: "Password must contain at least one uppercase letter.",
            });
            return false;
        }

        if (!lowercase.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password Error!",
                text: "Password must contain at least one lowercase letter.",
            });
            return false;
        }

        if (password.length < minLength) {
            Swal.fire({
                icon: "error",
                title: "Password Error!",
                text: "Password must be at least 6 characters long.",
            });
            return false;
        }

        return true;
    };

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;

        if (!validatePassword(password)) {
            return;
        }

        createUser(email, password)
            .then((result) => {
                console.log("User created:", result.user);

                updateUser({
                    displayName: name,
                    email: email,
                    photoURL: photoUrl,
                })
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Registration Successful!",
                            text: "Welcome to the platform!",
                            confirmButtonText: "Go to Home",
                        }).then(() => {
                            navigate("/");
                        });
                    })
                    .catch((error) => {
                        console.error("Profile update error:", error.message);
                        Swal.fire({
                            icon: "error",
                            title: "Profile Update Failed!",
                            text: "There was an error updating your profile.",
                        });
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error.message);
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire({
                        icon: "error",
                        title: "Email Already In Use!",
                        text: "This email is already in use. Please try another one.",
                    });
                } else if (error.code === "auth/weak-password") {
                    Swal.fire({
                        icon: "error",
                        title: "Weak Password!",
                        text: "Password is too weak. Please choose a stronger password.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Registration Failed!",
                        text: "An error occurred during registration. Please try again.",
                    });
                }
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="bg-white p-6 lg:p-10 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col lg:flex-row items-center transition-transform duration-500">
                <div className="lg:w-1/2 mb-6 lg:mb-0 flex justify-center">
                    <Lottie options={options} height={220} width={220} />
                </div>
                <div className="lg:w-1/2 flex flex-col items-center w-full">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                        Register Now
                    </h2>
                    <form onSubmit={handleRegister} className="w-full">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                id="photoURL"
                                name="photoUrl"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your photo URL"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                        >
                            Register
                        </button>
                        <GoogleLogin />
                    </form>
                    <p className="text-gray-600 mt-6 text-sm">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
