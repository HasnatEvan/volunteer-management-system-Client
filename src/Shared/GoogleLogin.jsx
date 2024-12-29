import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthContext from "../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2"; // Import SweetAlert2

const GoogleLogin = () => {
    const { logInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleGoogleLogIn = () => {
        logInWithGoogle()
            .then((result) => {
                console.log("Google Login Success:", result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'You have successfully logged in with Google.',
                    confirmButtonText: 'OK'
                });
                navigate("/"); // Navigate to Home page after successful login
            })
            .catch((error) => {
                console.error("Google Login Error:", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed!',
                    text: error.message,
                    confirmButtonText: 'Try Again'
                });
            });
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handleGoogleLogIn}
                className="flex items-center px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all"
            >
                <FcGoogle className="mr-3 text-2xl" />
                <span className="text-sm font-medium">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
