import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VolunteerNeedsNow = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://volunteer-management-website-server.vercel.app/volunteer-needs-now')
            .then((res) => res.json())
            .then((data) => {
                setVolunteers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
            <h2 className="text-2xl sm:text-4xl font-bold text-center text-[#1C5253] mb-10 animate__animated animate__fadeIn animate__delay-1s">
                𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓 𝑵𝒆𝒆𝒅𝒔 𝑵𝒐𝒘
            </h2>

            {loading ? (
                <p className="text-center text-gray-600 text-lg">Loading volunteer posts...</p>
            ) : volunteers.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No volunteer needs found at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {volunteers.map((volunteer) => (
                        <div
                            key={volunteer._id}
                            className="bg-white p-6 shadow-xl rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-[#1C5253]/30"
                        >
                            <img
                                src={volunteer.url}
                                alt={volunteer.postTitle}
                                className="w-full h-56 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-2 mb-2 hover:text-[#1C5253] transition-colors">
                                {volunteer.postTitle}
                            </h3>
                            <div className="mt-2 space-y-2">
                                <p className="text-gray-600 text-sm">
                                    <span className="font-medium text-gray-700">Category:</span>{' '}
                                    {volunteer.category}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    <span className="font-medium text-gray-700">Deadline:</span>{' '}
                                    <span className="text-red-500 font-bold">
                                        {new Date(volunteer.deadline).toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                            <Link to={`/volunteers/${volunteer._id}`}>
                                <button className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-medium text-lg rounded-lg hover:bg-teal-600 transition-all">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {!loading && volunteers.length > 0 && (
                <div className="flex justify-center mt-10">
                    <Link to="/allPosts">
                        <button className="px-6 py-3 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                            See All Post
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default VolunteerNeedsNow;
