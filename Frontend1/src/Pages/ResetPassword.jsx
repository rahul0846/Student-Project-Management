import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const ResetPassword = () => {

    const navigate = useNavigate();

    const { token } = useParams();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassword = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
        return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
    }

    try {

        const response = await axios.post(
            `${API_BASE_URL}/reset-password/${token}`,
            { password }
        );

        toast.success(response.data.message);

        setTimeout(() => {
            navigate("/login");
        }, 2000);

    } catch (error) {

        toast.error(error.response?.data?.message || "Something went wrong");

    }
};

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 px-4">

            <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>

            <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

                <h2 className="text-3xl font-bold text-white text-center mb-3">
                    Reset Password
                </h2>

                <p className="text-gray-300 text-center mb-8">
                    Create your new password
                </p>

                <label className="text-white font-medium">
                    New Password
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full mt-2 mb-5 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                />

                <label className="text-white font-medium">
                    Confirm Password
                </label>

                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full mt-2 mb-6 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                 onClick={updatePassword}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg hover:scale-105 transition" >
                 Update Password
                </button>

                <p
                    onClick={() => navigate("/login")}
                    className="text-center text-blue-300 mt-6 cursor-pointer hover:text-white"
                >
                    Back to Login
                </p>

            </div>
            <ToastContainer />

        </div>

    );
};

export default ResetPassword;