import { Link, useLoaderData, useNavigate } from "react-router-dom";

const PostDetails = () => {
    const { 
        _id, 
        url, 
        postTitle, 
        description, 
        category, 
        location, 
        volunteersNeeded, 
        deadline, 
        organizerName, 
        organizerEmail 
    } = useLoaderData();
    
    const navigate = useNavigate();

    // ব্যাক বাটন ফাংশন
    const handleGoBack = () => {
        navigate(-1); // আগের পেজে ফিরিয়ে নিয়ে যাবে
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
            {/* Full-width Thumbnail Image */}
            <img 
                className="w-full h-64 sm:h-80 md:h-[600px] object-cover rounded-lg mb-6"
                src={url} 
                alt={postTitle} 
            />
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">{postTitle}</h2>
            <p className="text-xs sm:text-sm text-gray-600 italic mb-4">{category}</p>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">{description}</p>

            {/* Location, Volunteers Needed, and Deadline */}
            <div className="mt-4 text-sm sm:text-base text-gray-600 space-y-2">
                <p><strong className="font-medium">Location:</strong> {location}</p>
                <p><strong className="font-medium">Volunteers Needed:</strong> {volunteersNeeded}</p>
                <p><strong className="font-medium">Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
            </div>

            {/* Organizer Information */}
            <div className="mt-6 border-t pt-6 text-gray-700">
                <p className="text-sm sm:text-base font-medium"><strong>Organizer:</strong> {organizerName}</p>
                <p className="text-sm sm:text-base"><strong>Email:</strong> {organizerEmail}</p>
            </div>

            {/* Buttons Section (Responsive Flexbox) */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Back Button */}
                <button 
                    onClick={handleGoBack}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white px-6 py-3 rounded-md hover:bg-[#1C5253] transition-colors"
                >
                    Back
                </button>
                
                {/* Be a Volunteer Button */}
                <Link to={`/beAVolunteerModal/${_id}`}>
                    <button 
                        className="w-full sm:w-auto bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white px-6 py-3 rounded-lg hover:bg-[#081e1e] transition-colors"
                    >
                        Be a Volunteer
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PostDetails;
