import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker"; // Ensure you import the DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the necessary CSS for DatePicker
import AuthContext from "../../Context/AuthContext";

const Update = () => {
    const volunteer = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Use the user from context
    const { _id, postTitle, description, category, location, volunteersNeeded, deadline } = volunteer;

    const [selectedDate, setSelectedDate] = useState(new Date(deadline));

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedData = {
            postTitle: event.target.postTitle.value,
            description: event.target.description.value,
            category: event.target.category.value,
            location: event.target.location.value,
            volunteersNeeded: event.target.volunteersNeeded.value,
            deadline: selectedDate.toISOString(), // Make sure the date is formatted properly
            url: event.target.url.value, // Include the thumbnail URL field
        };

        // Fetch request to update the data
        fetch(`https://volunteer-management-website-server.vercel.app/volunteers/${_id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.modifiedCount > 0) { // Modified check for successful update
                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'Volunteer post updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    // Navigate to allPosts after success
                    navigate('/allPosts');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating the volunteer post. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error with the request. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        });
    };

    return (
       <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
           <h2 className="text-2xl font-bold text-center mb-6">Update Volunteer Post</h2>
           <form className="space-y-4" onSubmit={handleSubmit}>
               {/* Form fields */}
               <div>
                   <label className="block text-gray-700">Thumbnail URL:</label>
                   <input
                       type="text"
                       name="url"
                       placeholder="Enter thumbnail URL"
                       className="w-full p-2 border rounded"
                       defaultValue={volunteer.url} // Populate the existing URL
                   />
               </div>
               <div>
                   <label className="block text-gray-700">Post Title:</label>
                   <input
                       type="text"
                       name="postTitle"
                       defaultValue={postTitle}
                       placeholder="Enter title"
                       className="w-full p-2 border rounded"
                   />
               </div>
               <div>
                   <label className="block text-gray-700">Description:</label>
                   <textarea
                       name="description"
                       defaultValue={description}
                       placeholder="Enter description"
                       className="w-full p-2 border rounded"
                   ></textarea>
               </div>
               <div>
                   <label className="block text-gray-700">Category:</label>
                   <select name="category" className="w-full p-2 border rounded" defaultValue={category}>
                       <option value="">Select a category</option>
                       <option value="Healthcare">Healthcare</option>
                       <option value="Education">Education</option>
                       <option value="Social Service">Social Service</option>
                       <option value="Animal Welfare">Animal Welfare</option>
                   </select>
               </div>
               <div>
                   <label className="block text-gray-700">Location:</label>
                   <input
                       type="text"
                       name="location"
                       defaultValue={location}
                       placeholder="Enter location"
                       className="w-full p-2 border rounded"
                   />
               </div>
               <div>
                   <label className="block text-gray-700">No. of Volunteers Needed:</label>
                   <input
                       type="number"
                       name="volunteersNeeded"
                       defaultValue={volunteersNeeded}
                       placeholder="Enter number"
                       className="w-full p-2 border rounded"
                   />
               </div>
               <div>
                   <label className="block text-gray-700">Deadline:</label>
                   <DatePicker
                       selected={selectedDate}
                       onChange={(date) => setSelectedDate(date)}
                       dateFormat="yyyy-MM-dd"
                       className="w-full p-2 border rounded"
                   />
               </div>
               <div>
                   <label className="block text-gray-700">Organizer Name:</label>
                   <input
                       type="text"
                       name="organizerName"
                       value={user?.displayName || 'Logged-in User Name'}
                       readOnly
                       className="w-full p-2 border rounded bg-gray-200"
                   />
               </div>
               <div>
                   <label className="block text-gray-700">Organizer Email:</label>
                   <input
                       type="email"
                       name="organizerEmail"
                       value={user?.email || 'user@example.com'}
                       readOnly
                       className="w-full p-2 border rounded bg-gray-200"
                   />
               </div>
               <button
                   type="submit"
                   className="w-full p-3 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-bold rounded hover:bg-gradient-to-r hover:from-[#FF6347] hover:to-[#FF4500]"
               >
                   Update Post
               </button>
           </form>
       </div>
    );
};

export default Update;
