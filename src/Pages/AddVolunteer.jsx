import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import Swal from 'sweetalert2';

const AddVolunteer = () => {
    const { user } = useContext(AuthContext);
    const [deadline, setDeadline] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const url = form.url.value;
        const postTitle = form.postTitle.value;
        const description = form.description.value;
        const category = form.category.value;
        const location = form.location.value;
        const volunteersNeeded = form.volunteersNeeded.value;
        const organizerName = form.organizerName.value;
        const organizerEmail = form.organizerEmail.value;

        if (!url || !postTitle || !description || !category || !location || !volunteersNeeded || !deadline || !organizerName || !organizerEmail) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return;
        }

        const formData = {
            url,
            postTitle,
            description,
            category,
            location,
            volunteersNeeded,
            deadline,
            organizerName,
            organizerEmail,
        };

        fetch('https://volunteer-management-website-server.vercel.app/volunteers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Volunteer post added successfully.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                }).then(() => {
                    navigate('/allPosts');
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding the volunteer post. Please try again.',
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
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h2 className="text-2xl font-bold text-center text-[#1c585a] mb-6">𝑨𝒅𝒅 𝑽𝒐𝒍𝒖𝒏𝒕𝒆𝒆𝒓 𝑷𝒐𝒔𝒕</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700">Thumbnail URL:</label>
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter thumbnail URL"
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Post Title:</label>
                    <input
                        type="text"
                        name="postTitle"
                        placeholder="Enter title"
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        className="w-full p-2 border rounded bg-gray-100"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Category:</label>
                    <select name="category" className="w-full p-2 border rounded bg-gray-100">
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
                        placeholder="Enter location"
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">No. of Volunteers Needed:</label>
                    <input
                        type="number"
                        name="volunteersNeeded"
                        placeholder="Enter number"
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Deadline:</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select deadline"
                        className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-3 bg-gradient-to-r from-[#1C5253] to-[#2A8F8F] text-white font-bold rounded hover:from-[#FF6347] hover:to-[#FF4500] transition duration-300"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddVolunteer;
