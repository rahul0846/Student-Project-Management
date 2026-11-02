import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const submitButton = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    try {

      const response = await axios.post(
        `${API_BASE_URL}/forgot-password`,
        { email }
      );

      toast.success(response.data.message);

      setEmail("");

    } catch (error) {

      toast.error(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 px-4">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

        <form onSubmit={submitButton}>

          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Forgot Password
          </h2>

          <p className="text-gray-300 text-center mb-8">
            Enter your registered email address
          </p>

          <label className="text-white font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 mb-6 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg hover:scale-105 transition"
          >
            Send Reset Link
          </button>

        </form>

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

export default ForgotPassword;