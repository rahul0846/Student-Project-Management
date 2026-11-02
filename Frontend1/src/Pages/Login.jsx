import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import { API_BASE_URL } from '../config/api'

const Login = () => {
    const navigate = useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const submitButton =async(e)=>{
        e.preventDefault()
        if(!email || !password){
             return toast.error("All Fields Necessary")
        }
        try {
            const login= await axios.post(`${API_BASE_URL}/login`,{
                email,password
            })
            setEmail("")
            setPassword("")
            localStorage.setItem("token" , login.data.token)
            localStorage.setItem("role" ,login.data.role )
            localStorage.setItem("id",login.data.id)
            if(login.data.role === "Student"){
          navigate("/studentdashboard")
            }
             if(login.data.role === "Teacher"){
          navigate("/teacherdashboard")
            }
            

        } 
        catch (error) {
         console.log(error)

         if (error.response) {
          toast.error(error.response.data.message || error.response.data)
         } else {
            toast.error("Something went wrong")
          }
        }
      }
    useEffect(()=>{
        submitButton()
    },[])

  return (

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 px-4">

    {/* Background Blur */}
    <div className="absolute w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20 top-10 left-10"></div>
    <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-[150px] opacity-20 bottom-10 right-10"></div>

    <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-br from-blue-700 to-indigo-900 text-white">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="login"
          className="w-48 mb-8"
        />

        <h1 className="text-4xl font-bold mb-4">
          Welcome Back!
        </h1>

        <p className="text-center text-blue-100 leading-7">
          Login to access your Student Project Management
          dashboard and continue managing your academic
          projects efficiently.
        </p>

      </div>

      {/* Right Side */}
      <div className="p-10 md:p-14">

        <form onSubmit={submitButton}>

          <h2 className="text-4xl font-bold text-white mb-2">
            Login
          </h2>

          <p className="text-gray-300 mb-8">
            Sign in to your account
          </p>

          {/* Email */}
          <div className="mb-6">

            <label className="text-white font-medium">
              Email Address
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
          <div className="mb-8">

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

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition duration-300"
          >
            Login
          </button>
          
          <p
           onClick={() => navigate("/forgot-password")}
           className="text-right text-blue-300 cursor-pointer hover:text-white mb-4"
          >
            Forgot Password?
          </p>

          <p className="text-center text-gray-300 mt-6">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-300 cursor-pointer hover:text-white ml-2"
            >
              Register
            </span>
          </p>

        </form>

      </div>

    </div>

    <ToastContainer />

  </div>
  )
}

export default Login