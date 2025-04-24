import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import auth from "../FireBase/FireBase";

const EditProfile = () => {
    const { user } = useContext(AuthContext);
    const [editable, setEditable] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || "");
    const [newEmail] = useState(user?.email || "");

    const handleEdit = () => {
        setEditable(!editable);
    };

    const handleSave = async () => {
        try {
            if (newName !== user?.displayName) {
                await updateProfile(auth.currentUser, { displayName: newName });
            }

            setEditable(false);

            Swal.fire({
                title: "✅ Success!",
                text: "Your profile has been updated.",
                icon: "success",
                confirmButtonText: "Okay",
            });
        } catch (error) {
            console.error("Error updating profile:", error);

            Swal.fire({
                title: "❌ Error!",
                text: "There was an issue updating your profile.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            <div className="w-full max-w-xl p-8  bg-white space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={user?.photoURL || "https://source.unsplash.com/150x150/?portrait?3"}
                        alt="Profile"
                        className="w-36 h-36 rounded-full border-4 border-teal-400"
                    />
                    <div className="w-full space-y-4">
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Full Name:</label>
                            {editable ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-3 rounded-md border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            ) : (
                                <p className="text-lg font-semibold text-gray-800">{newName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Email:</label>
                            <input
                                type="email"
                                value={newEmail}
                                disabled
                                className="w-full p-3 rounded-md border bg-gray-100 cursor-not-allowed text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                    <button
                        onClick={handleEdit}
                        className={`px-6 py-2 rounded-md font-medium text-white transition duration-300 ${
                            editable ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {editable ? "Cancel" : "Edit"}
                    </button>
                    {editable && (
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-md font-medium text-white bg-green-500 hover:bg-green-600 transition duration-300"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
