import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import PostsCard from "./Components/PostsCard";

const AllVolunteerPost = () => {
    const volunteers = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isTableLayout, setIsTableLayout] = useState(false);

    const itemsPerPage = 6;

    const filteredVolunteers = volunteers.filter((volunteer) =>
        volunteer.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVolunteers = filteredVolunteers.slice(startIndex, startIndex + itemsPerPage);

    const handleLayoutChange = () => {
        setIsTableLayout(!isTableLayout);
    };

    return (
        <div className="container mx-auto px-6 py-10 bg-white">
            {/* Page Title */}
            <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-center mb-8 text-[#1c585a] tracking-wide">
                𝑨𝒍𝒍 𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓 𝑵𝒆𝒆𝒅 𝑷𝒐𝒔𝒕𝒔
            </h1>

            {/* Search Input and Change Layout Button */}
            <div className="flex flex-col sm:flex-row justify-center bg-white items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-1/2 md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                />
                <button
                    onClick={handleLayoutChange}
                    className="px-6 py-3 mt-4 sm:mt-0 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white rounded-lg hover:from-[#2A8F8F] hover:to-[#1C5253] focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                    {isTableLayout ? "Switch to Grid View" : "Switch to Table View"}
                </button>
            </div>

            {/* Conditional Layout Rendering */}
            {isTableLayout ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm text-left text-gray-600 border-separate border-spacing-0">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Post Title</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedVolunteers.map((volunteer) => (
                                <tr key={volunteer._id} className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">{volunteer.postTitle}</td>
                                    <td className="px-6 py-4">{volunteer.category}</td>
                                    <td className="px-6 py-4">{volunteer.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedVolunteers.map((volunteer) => (
                        <PostsCard key={volunteer._id} volunteer={volunteer} />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 border border-gray-300 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white hover:from-[#2A8F8F] hover:to-[#1C5253]'}`}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-6 py-3 border border-gray-300 rounded-lg ${currentPage === index + 1 ? 'bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white' : 'bg-white text-gray-600'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 border border-gray-300 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white hover:from-[#2A8F8F] hover:to-[#1C5253]'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllVolunteerPost;
