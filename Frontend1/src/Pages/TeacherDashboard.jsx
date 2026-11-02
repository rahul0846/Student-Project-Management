import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
const TeacherDashboard = () => {
  const navigate = useNavigate()
  const id =localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const[data, setData]= useState({})
  const[allProjects , setAllProjects]=useState([])

  const fetchUser=async()=>{
try {
    const user = await axios.get(`${API_BASE_URL}/dashboard/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    setData(user.data)
     toast.success(`Login sucess`)
} catch (error) {
    console.log(error)
}
  }

const fetchProjects =async()=>{
  try {
    const projects = await axios.get(`${API_BASE_URL}/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
    setAllProjects(projects.data)
    console.log(projects.data)
  } catch (error) {
    
  }
} 

const approved = async(pid)=>{
  try {
    
  const approve = await axios.patch(`${API_BASE_URL}/project/${pid}/approve`)
    toast.success("Project Approved")
  fetchProjects()
  } catch (error) {
    
  }
}
const Rejected = async(pid)=>{
  try {
    const reject = await axios.patch(`${API_BASE_URL}/project/${pid}/reject`)
    fetchProjects()
    toast.warn("Project Rejected")
  } catch (error) {
    
  }
}

  useEffect(()=>{
    fetchUser(),
    fetchProjects()
  },[])

const logout =()=>{
  localStorage.clear()
  navigate("/")
}

  return (
    <div>
     <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-xl">

  <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

    <div>

      <h1 className="text-4xl font-bold text-white">
        Welcome, {data.name} 👋
      </h1>

      <p className="text-blue-100 mt-2">
        Teacher Dashboard
      </p>

    </div>

    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl text-white shadow-lg hover:scale-105 transition"
    >
      Logout
    </button>

  </div>
</header>
    <div className="max-w-7xl mx-auto px-8 py-8">

<div className="grid md:grid-cols-2 gap-6 mb-10">

<div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white">

<h2 className="text-xl">
Total Projects
</h2>

<h1 className="text-6xl font-bold mt-4">
{allProjects.length}
</h1>

</div>

<div className="bg-white rounded-3xl shadow-xl p-8">

<h2 className="text-3xl font-bold">
Projects Submitted by Students
</h2>

<p className="text-gray-500 mt-3">
Review all projects submitted by students and
approve or reject them.
</p>

</div>
</div>
      <div className='w-3/4 m-auto grid grid-cols-3 gap-5'>
          
{
  allProjects.map((project)=>{
    return(
      <>
      <div className='w-full'>
              <div className='bg-blue-300 mb-10 p-2 rounded-md'>
          <p>Project name :{project.project}</p>
          <p>Project Status:{project.status}</p>
          <p>Submitted by :{project.studentId.name}</p>
          <button className='bg-green-500 rounded-md p-1 m-1' onClick={()=>approved(project._id)} disabled={project.status !== "pending"}>Approve</button>
          <button className='bg-red-500 rounded-md p-1 m-1' onClick={()=>Rejected(project._id)} disabled={project.status !== "pending"}>Reject</button>
      </div>
      </div>

      </>
    )
  })
}
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default TeacherDashboard