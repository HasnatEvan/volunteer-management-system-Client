import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://volunteer-management-website-server.vercel.app",
  withCredentials: true, // Ensures cookies are sent with requests
});

const useAxios = () => {
  const { logout } = useAuth(); // Fix: Call useAuth to destructure logout
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response, // Pass successful responses
      async (error) => {
        console.log("Error caught in interceptor");
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Handle unauthorized or forbidden access
          console.error("Unauthorized or forbidden access. Redirecting to login...");
          try {
            await logout(); // Call the logout function to clear authentication state
            navigate("/login"); // Redirect the user to the login page
          } catch (logoutError) {
            console.error("Error during logout:", logoutError);
          }
        }
        return Promise.reject(error); // Reject the promise with the error
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor); // Cleanup interceptor on unmount
    };
  }, [logout, navigate]); // Add dependencies

  return axiosInstance;
};

export default useAxios;
