import { Link } from 'react-router-dom';
import { useState } from 'react';

const PostsCard = ({ volunteer }) => {
    const { _id, url, postTitle, description, category, location, volunteersNeeded, deadline } = volunteer;
    const [showFullDetails, setShowFullDetails] = useState(false);

    return (
        <div className="max-w-xs w-full mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl sm:max-w-xs md:max-w-sm lg:max-w-md flex flex-col h-full">
            {/* Thumbnail Image */}
            <img
                className="w-full h-36 sm:h-32 md:h-36 lg:h-40 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                src={url}
                alt={postTitle}
            />
            <div className="p-4 sm:p-4 flex flex-col flex-grow">
                {/* Title and Category */}
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {postTitle}
                </h2>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-1 italic">{category}</p>

                {/* Description */}
                <p className="text-gray-700 mt-3 text-xs sm:text-sm md:text-base line-clamp-2">
                    {description.length > 80 && !showFullDetails
                        ? `${description.substring(0, 80)}...`
                        : description}
                </p>

                {/* Show More/Show Less Button */}
                <button
                    className="text-blue-500 text-xs sm:text-sm mt-2 hover:underline"
                    onClick={() => setShowFullDetails(!showFullDetails)}
                >
                    {showFullDetails ? 'Show Less' : 'Show More'}
                </button>

                {/* Location and Volunteers Needed */}
                {showFullDetails && (
                    <div className="mt-2 text-xs sm:text-xs md:text-sm text-gray-600">
                        <p>
                            <strong>Location:</strong> {location}
                        </p>
                        <p>
                            <strong>Volunteers Needed:</strong> {volunteersNeeded}
                        </p>
                        <p>
                            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
                        </p>
                    </div>
                )}

                {/* View Details Button */}
                <div className="mt-3">
                    <Link
                        to={`/volunteers/${_id}`}
                        className="block w-full py-1.5 text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-bold rounded-md hover:from-[#1B4545] hover:to-[#257D7D] transition-colors duration-300 text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostsCard;
