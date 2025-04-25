import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../../Context/AuthContext';
import useAxios from '../../hooks/useAxios';
import { FaSpinner } from 'react-icons/fa';
import { FaTag, FaFolder, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'

const VolunteerRequestPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get(`/applications?email=${user.email}`);
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching data. Please try again later.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchPosts();
        }
    }, [user.email]);

    const handleCancelRequest = (postId) => {
        const post = posts.find((post) => post._id === postId);

        if (!post) {
            Swal.fire({
                title: 'Error!',
                text: 'Post not found.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

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
                <div className="text-center">
                    <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-2" />
                    <div className="text-gray-600">Loading your Request...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-[#1c585a]">
                𝑴𝒚 𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓 𝑹𝒆𝒒𝒖𝒆𝒔𝒕 𝑷𝒐𝒔𝒕𝒔
            </h1>

            {posts.length > 0 ? (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className=" bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white">
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
                                                onClick={() => handleCancelRequest(post._id)}
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

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
                            >
                                <p className="flex items-center gap-2">
                                    <FaTag className="text-[#1C5253]" />
                                    <span className="font-semibold">Title:</span> {post.postTitle}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaFolder className="text-[#1C5253]" />
                                    <span className="font-semibold">Category:</span> {post.category}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-[#1C5253]" />
                                    <span className="font-semibold">Deadline:</span> {post.deadline}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaInfoCircle className="text-[#1C5253]" />
                                    <span className="font-semibold">Status:</span> {post.status || 'requested'}
                                </p>
                                <button
                                    onClick={() => handleCancelRequest(post._id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full"
                                >
                                    Cancel Request
                                </button>
                            </div>
                        ))}
                    </div>

                </>
            ) : (
                <p className="text-center text-gray-600">No posts available.</p>
            )}
        </div>
    );
};

export default VolunteerRequestPosts;
