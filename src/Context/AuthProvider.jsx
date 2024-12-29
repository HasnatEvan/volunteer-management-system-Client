import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../FireBase/FireBase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    updateEmail, // Import updateEmail
} from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user); // Update user state
                return result;
            })
            .catch((error) => {
                console.error("Google Login Error:", error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    // Update user profile function
    const updateUser = async (userData) => {
        try {
            // Update displayName if provided
            if (userData.displayName) {
                await updateProfile(auth.currentUser, {
                    displayName: userData.displayName,
                });
            }

            // Update email if provided
            if (userData.email) {
                await updateEmail(auth.currentUser, userData.email);
            }

            // Return updated user after successful profile update
            return auth.currentUser;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("State captured:", currentUser?.email);
            if(currentUser?.email){
                const user={email:currentUser.email}
                axios.post('https://volunteer-management-website-server.vercel.app/jwt',user,{ withCredentials:true})
                .then(res=>{
                    console.log('login token',res.data)
                    setLoading(false);
                })
            }

            else{
                axios.post('https://volunteer-management-website-server.vercel.app/logout',{},{withCredentials:true})
                .then(res=>{
                    console.log('logout',res.data)
                    setLoading(false);
                })
            }


         
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logout,
        logInWithGoogle,
        updateUser, // Corrected the function name here
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
