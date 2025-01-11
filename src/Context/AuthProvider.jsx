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
    updateEmail,
} from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Log in with email and password
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Log in with Google
    const logInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result;
        } catch (error) {
            console.error("Google Login Error:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => setUser(null))
            .finally(() => setLoading(false));
    };

    // Update user profile
    const updateUser = async (userData) => {
        try {
            const currentUser = auth.currentUser;

            // Update displayName if provided
            if (userData.displayName) {
                await updateProfile(currentUser, {
                    displayName: userData.displayName,
                });
            }

            // Update email if provided
            if (userData.email) {
                await updateEmail(currentUser, userData.email);
            }

            // Return the updated user object
            return currentUser;
        } catch (error) {
            console.error("Error updating user:", error.message);
            throw error;
        }
    };

    // Listen to auth state changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const userPayload = { email: currentUser.email };
                try {
                    const response = await axios.post(
                        "https://volunteer-management-website-server.vercel.app/jwt",
                        userPayload,
                        { withCredentials: true }
                    );
                    console.log("Login token:", response.data);
                } catch (error) {
                    console.error("JWT token creation error:", error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                try {
                    const response = await axios.post(
                        "https://volunteer-management-website-server.vercel.app/logout",
                        {},
                        { withCredentials: true }
                    );
                    console.log("Logout response:", response.data);
                } catch (error) {
                    console.error("Logout error:", error.message);
                } finally {
                    setLoading(false);
                }
            }
        });

        return () => unSubscribe();
    }, []);

    // Provide auth context
    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logout,
        logInWithGoogle,
        updateUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
