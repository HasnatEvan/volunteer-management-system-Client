import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const VolunteerNeedsNow = () => {
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetch('https://volunteer-management-website-server.vercel.app/volunteer-needs-now')
            .then((res) => res.json())
            .then((data) => setVolunteers(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
                Volunteer Needs Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {volunteers.map((volunteer) => (
                    <div
                        key={volunteer._id}
                        className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2"
                    >
                        <img
                            src={volunteer.url}
                            alt={volunteer.postTitle}
                            className="w-full h-56 object-cover rounded-lg"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mt-4">
                            {volunteer.postTitle}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                            <span className="font-medium text-gray-700">Category:</span>{' '}
                            {volunteer.category}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            <span className="font-medium text-gray-700">Deadline:</span>{' '}
                            <span className="text-red-500 font-bold">
                                {new Date(volunteer.deadline).toLocaleDateString()}
                            </span>
                        </p>
                        <Link to={`/volunteers/${volunteer._id}`}>
                            <button className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-medium text-lg rounded-lg hover:bg-teal-600 transition">
                                View Details
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Link to="/allPosts">
                    <button className="px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#1E88E5] text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
                        See All Post
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VolunteerNeedsNow;
