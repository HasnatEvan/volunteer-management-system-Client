import { Link } from 'react-router-dom';
import { useState } from 'react';

const PostsCard = ({ volunteer }) => {
    const { _id, url, postTitle, description, category, location, volunteersNeeded, deadline } = volunteer;
    const [showFullDetails, setShowFullDetails] = useState(false);

    return (
        <div className="max-w-xs w-full mx-auto rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 transition-all hover:shadow-xl hover:scale-[1.03] sm:max-w-xs md:max-w-sm lg:max-w-md flex flex-col h-full">
            {/* Thumbnail Image */}
            <img
                className="w-full h-40 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
                src={url}
                alt={postTitle}
            />

            <div className="p-5 flex flex-col flex-grow">
                {/* Title and Category */}
                <h2 className="text-lg font-semibold text-gray-800 hover:text-[#1C5253] transition duration-200">
                    {postTitle}
                </h2>
                <p className="text-sm text-gray-500 mt-1 italic">{category}</p>

                {/* Description */}
                <p className="text-gray-700 mt-3 text-sm line-clamp-2">
                    {description.length > 80 && !showFullDetails
                        ? `${description.substring(0, 80)}...`
                        : description}
                </p>

                {/* Show More/Show Less Button */}
                <button
                    className="text-[#2A8F8F] text-sm mt-2 hover:underline focus:outline-none"
                    onClick={() => setShowFullDetails(!showFullDetails)}
                >
                    {showFullDetails ? 'Show Less' : 'Show More'}
                </button>

                {/* Extra Info */}
                {showFullDetails && (
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <p><strong>📍 Location:</strong> {location}</p>
                        <p><strong>👥 Volunteers Needed:</strong> {volunteersNeeded}</p>
                        <p><strong>🗓 Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
                    </div>
                )}

                {/* View Details Button */}
                <div className="mt-auto pt-4">
                    <Link
                        to={`/volunteers/${_id}`}
                        className="block w-full py-2 text-sm bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-bold rounded-md hover:from-[#164343] hover:to-[#227474] transition duration-300 text-center"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostsCard;
