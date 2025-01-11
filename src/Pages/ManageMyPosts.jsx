import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import VolunteerRequestPosts from "./Components/VolunteerRequestPosts";
import useAxios from "../hooks/useAxios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ManageMyPosts = () => {
  const { user } = useContext(AuthContext);
  const [volunteer, setVolunteer] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure
      .get(`/volunteers?email=${user.email}`)
      .then((res) => {
        setVolunteer(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch data. Please try again.");
        setIsLoading(false);
      });
  }, [user.email, axiosSecure]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/volunteers/${_id}`)
          .then(() => {
            setVolunteer((prevVolunteers) =>
              prevVolunteers.filter((post) => post._id !== _id)
            );
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the post.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#1c585a] text-center mb-6">𝑴𝒚 𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓 𝑷𝒐𝒔𝒕𝒔</h1>
      {volunteer.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No volunteer posts available.</div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className=" bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white border-b">
                <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">Post Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">Deadline</th>
                <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteer.map((post) => {
                const { _id, postTitle, category, deadline } = post;
                return (
                  <tr key={_id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6">{postTitle}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">{category}</td>
                    <td className="px-4 py-4 text-sm text-gray-600 sm:px-6">{new Date(deadline).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-sm font-medium flex space-x-2 sm:px-6">
                      <Link to={`/update/${_id}`}>
                        <button className="bg-[#1c585a] text-white hover:text-white hover:bg-[#1c585a] px-4 py-2 rounded-md border border-[#1c585a] transition-all duration-300">
                          <FaEdit className="inline mr-2" /> Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 px-4 py-2 rounded-md border border-red-500 transition-all duration-300"
                      >
                        <FaTrashAlt className="inline mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <VolunteerRequestPosts />
    </div>
  );
};

export default ManageMyPosts;
