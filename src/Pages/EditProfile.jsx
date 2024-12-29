import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import auth from "../FireBase/FireBase";

const EditProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [editable, setEditable] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || "");
    const [newEmail, setNewEmail] = useState(user?.email || "");

    const handleEdit = () => {
        setEditable(!editable);
    };

    const handleSave = async () => {
        try {
            // শুধু displayName আপডেট করা
            if (newName !== user?.displayName) {
                await updateProfile(auth.currentUser, { displayName: newName });
            }

            setEditable(false); // Save করার পর এডিট মোড বন্ধ

            Swal.fire({
                title: "Success!",
                text: "Your profile has been updated.",
                icon: "success",
                confirmButtonText: "Okay",
                showConfirmButton: true,  // নিশ্চিত বাটন কন্ট্রোল
                willClose: () => {}  // সাউন্ড/আইকন বন্ধ করার জন্য
            });
        } catch (error) {
            console.error("Error updating profile:", error);

            Swal.fire({
                title: "Error!",
                text: "There was an issue updating your profile.",
                icon: "error",
                confirmButtonText: "Try Again",
                showConfirmButton: true,
                willClose: () => {}  // সাউন্ড/আইকন বন্ধ করার জন্য
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-2xl p-12 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
                <div className="flex flex-col items-center space-y-6">
                    <img
                        src={user?.photoURL || "https://source.unsplash.com/150x150/?portrait?3"}
                        alt="Profile Picture"
                        className="w-48 h-48 rounded-full border-4 border-gray-300 dark:border-gray-500"
                    />
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl font-semibold">
                            {editable ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="p-3 rounded-md w-full text-lg"
                                />
                            ) : (
                                newName
                            )}
                        </h2>
                        {/* ইমেইল ফিল্ড ডিসেবল করা */}
                        <p className="text-sm text-gray-500">
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="p-3 rounded-md w-full text-lg"
                                disabled
                            />
                        </p>
                    </div>
                </div>
                <div className="flex justify-center space-x-6">
                    <button
                        onClick={handleEdit}
                        className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        {editable ? "Cancel" : "Edit"}
                    </button>
                    {editable && (
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
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
