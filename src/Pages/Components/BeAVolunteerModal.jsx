import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';

const BeAVolunteerModal = () => {
    const { id } = useParams(); // Get the ID from the route
    const [postDetails, setPostDetails] = useState(null);
    const [suggestion, setSuggestion] = useState('');
    const [status] = useState('requested');
    const [buttonText, setButtonText] = useState('Request');
    const [isRequestSent, setIsRequestSent] = useState(false);
    const { user } = useContext(AuthContext); // Get user from AuthContext
    const navigate = useNavigate(); // useNavigate hook for navigation

    // Fetch the specific post data from the database
    useEffect(() => {
        fetch(`https://volunteer-management-website-server.vercel.app/volunteers/${id}`)
            .then((res) => res.json())
            .then((data) => setPostDetails(data))
            .catch((err) => console.error(err));
    }, [id]);

    // Handle the request submission
    const handleRequest = async (event) => {
        event.preventDefault();

        if (!suggestion.trim()) {
            Swal.fire('Error!', 'Please provide your suggestion before submitting.', 'error');
            return; // Stop form submission if suggestion is empty
        }

        if (isRequestSent) return; // Prevent multiple submissions

        setIsRequestSent(true); // Disable the button
        setButtonText('Requested'); // Change button text to 'Requested'

        const requestData = {
            postId: id,
            volunteerName: user?.displayName || 'Anonymous',
            volunteerEmail: user?.email || 'No Email Provided',
            suggestion,
            status,
            postTitle: postDetails?.postTitle, // Sending postTitle
            category: postDetails?.category, // Sending category
            deadline: postDetails?.deadline, // Sending deadline
        };

        try {
            const response = await fetch('https://volunteer-management-website-server.vercel.app/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            Swal.fire('Success!', 'Your request has been sent.', 'success');
            navigate('/manage-posts'); // Navigate to /manage-posts after successful request
        } catch (err) {
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
            setIsRequestSent(false); // Re-enable button if there was an error
            setButtonText('Request'); // Reset button text
        }
    };

    return (
        <form onSubmit={handleRequest} className="max-w-3xl mx-auto p-6 bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">Be a Volunteer</h2>
            <div className="space-y-4">
                {postDetails ? (
                    <>
                        <div>
                            <label className="block text-gray-700">Thumbnail:</label>
                            <img
                                src={postDetails?.thumbnail}
                                alt={postDetails?.postTitle}
                                className="w-full rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Post Title:</label>
                            <input
                                type="text"
                                value={postDetails?.postTitle}
                                readOnly
                                name="title"
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Description:</label>
                            <textarea
                                value={postDetails?.description}
                                readOnly
                                name="Description"
                                className="w-full p-2 border rounded bg-gray-200"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700">Category:</label>
                            <input
                                type="text"
                                value={postDetails?.category}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Location:</label>
                            <input
                                type="text"
                                value={postDetails?.location}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Volunteers Needed:</label>
                            <input
                                type="number"
                                value={postDetails?.volunteersNeeded}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Deadline:</label>
                            <input
                                type="date"
                                value={postDetails?.deadline ? new Date(postDetails.deadline).toISOString().split('T')[0] : ''}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Organizer Name:</label>
                            <input
                                type="text"
                                value={user?.displayName || 'Anonymous'}
                                readOnly
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Organizer Email:</label>
                            <input
                                type="email"
                                value={user?.email || 'No Email Provided'}
                                readOnly
                                name="volunteerEmail"
                                className="w-full p-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Your Suggestion:</label>
                            <textarea
                                value={suggestion}
                                name="Suggestion"
                                onChange={(e) => setSuggestion(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Enter your suggestion here"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-bold rounded hover:bg-gradient-to-r hover:from-[#FF6347] hover:to-[#FF4500]"
                            disabled={isRequestSent}
                        >
                            {buttonText}
                        </button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </form>
    );
};

export default BeAVolunteerModal;
