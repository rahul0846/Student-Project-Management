import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[role,setRole]=useState("Student")
    const[error,setError]=useState('')


const register =async(e)=>{
    e.preventDefault()
    if(!name || !email || !password){
    return setError("All fileds Necesaary")
    }
   
    try {
        const details= await axios.post('http://localhost:5000/api/signup',{
            name,
            email,
            password,
            role
        })
        setEmail("")
        setPassword("")
        setName("")
        toast.success("Registration Sucessfull")
        setTimeout(() => {
            navigate("/login")
        }, 3000);
        console.log(details)
    } catch (err) {
        setError(err.message)
    }

}

useEffect(()=>{
    register()
},[])

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 px-4 py-10">

    {/* Background Blur */}
    <div className="absolute top-10 left-10 w-80 h-80 bg-blue-400 rounded-full blur-[140px] opacity-20"></div>
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 rounded-full blur-[140px] opacity-20"></div>

    <div className="relative w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 to-indigo-900 p-10 text-white">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
          alt="register"
          className="w-48 mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">
          Join EduPortal
        </h1>

        <p className="text-center text-blue-100 leading-7">
          Create your account and start managing projects,
          collaborating with teachers and tracking your
          academic progress.
        </p>

      </div>

      {/* Right Section */}
      <div className="p-8 md:p-12">

        <form onSubmit={register}>

          <h2 className="text-4xl font-bold text-white mb-2">
            Register
          </h2>

          <p className="text-gray-300 mb-6">
            Create your new account
          </p>

          {error && (
            <p className="bg-red-500/20 border border-red-400 text-red-200 rounded-lg p-3 mb-5">
              {error}
            </p>
          )}

          {/* Name */}
          <div className="mb-5">
            <label className="text-white font-medium">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="text-white font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="text-white font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Role */}
          <div className="mb-8">
            <label className="text-white font-medium">
              Select Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option className="text-black" value="Student">
                Student
              </option>

              <option className="text-black" value="Teacher">
                Teacher
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Create Account
          </button>

          <p className="text-center text-gray-300 mt-6">
            Already have an account?

            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-blue-300 hover:text-white cursor-pointer"
            >
              Login
            </span>
          </p>

        </form>

      </div>

    </div>

    <ToastContainer />

  </div>
)
}

export default Register