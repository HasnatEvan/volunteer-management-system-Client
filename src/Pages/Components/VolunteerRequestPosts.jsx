import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Importing SweetAlert2 for confirmation dialogs
import AuthContext from '../../Context/AuthContext';
import useAxios from '../../hooks/useAxios';

const VolunteerRequestPosts = () => {
    const [posts, setPosts] = useState([]); // State to store posts data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state
    const { user } = useContext(AuthContext); // Logged-in user's data
    const axiosSecure = useAxios();

    useEffect(() => {
        // Async function to fetch posts data
        // const fetchPosts = async () => {
        //     try {
        //         const response = await fetch(`https://volunteer-management-website-server.vercel.app/applications?email=${user.email}`); // API URL
        //         const data = await response.json();
        //         setPosts(data); // Set data in state
        //     } catch (error) {
        //         setError('Error fetching data. Please try again later.');
        //         console.error('Error fetching data:', error);
        //     } finally {
        //         setLoading(false); // End loading state
        //     }
        // };

        // if (user?.email) {
        //     fetchPosts(); // Only fetch if user email is present
        // }
        // Fetch posts data when the component is mounted or user email changes
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`/applications?email=${user.email}`);
                setPosts(response.data); // Set data in state
            } catch (error) {
                setError('Error fetching data. Please try again later.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // End loading state
            }
        };

        if (user?.email) {
            fetchPosts(); // Only fetch if user email is present
        }
    }, [user.email]); // Dependency array, fetch data again if user's email changes

    const handleCancelRequest = (postId) => {
        // Find the post based on postId
        const post = posts.find((post) => post._id === postId);

        // If post not found, return
        if (!post) {
            Swal.fire({
                title: 'Error!',
                text: 'Post not found.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // SweetAlert2 confirmation before canceling the request
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to cancel this volunteer request!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.delete(`/applications/${postId}`);
                    if (response.status === 200) {
                        // On success, remove the post from the UI
                        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                        Swal.fire('Cancelled!', 'Your request has been cancelled.', 'success');
                    } else {
                        Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
                    console.error('Error deleting request:', error);
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p> {/* Loading state */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{error}</p> {/* Error message */}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Volunteer Request Posts</h1>
            {posts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Post Title</th>
                                <th className="border border-gray-300 px-4 py-2">Category</th>
                                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{post.postTitle}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.category}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.deadline}</td>
                                    <td className="border border-gray-300 px-4 py-2">{post.status || 'requested'}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleCancelRequest(post._id)} // Cancel request
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Cancel Request
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default VolunteerRequestPosts;
