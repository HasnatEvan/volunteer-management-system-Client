import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Error = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleGoBack = () => {
    navigate("/"); // Redirect to the home page ("/")
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Start off-screen and invisible
      animate={{ opacity: 1, y: 0 }}  // Fade in and slide to the center
      transition={{ duration: 1.2, type: "spring", stiffness: 100 }} // Smoother transition
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#1C5253] to-[#1C5253]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-center bg-white text-[#1C5253] p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all"
      >
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-xl mb-6 text-red-500">Oops! The page you're looking for doesn't exist.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack} // Add the click handler
          className="px-6 py-2 bg-[#1C5253] text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Error;
