import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

const Icon = ({ name, className = "h-5 w-5" }) => {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    folder: <><path d="M3 7h6l2 2h10v10H3z"/><path d="M3 7V5h6l2 2h10v2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    logout: <><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 3h5a2 2 0 012 2v14a2 2 0 01-2 2h-5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
    upload: <><path d="M12 16V4m0 0L7 9m5-5l5 5"/><path d="M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"/></>,
    trash: <><path d="M3 6h18M8 6V3h8v3m-9 0l1 15h8l1-15"/><path d="M10 10v7M14 10v7"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="M8 12l2.5 2.5L16 9"/></>,
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const StudentDashboard = () => {
  const navigate = useNavigate()
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token")
      const[data,setData]=useState({})
      const[allTeachers,setAllTeachers]=useState([])
      const[teacherId,setTeacherId]=useState("")
      const[project,setProject]=useState("")
      const[description ,setDescription]=useState("")
      const[projects,setProjects]=useState([])
          const[isLoading , setIsLoading]=useState(true)

         const [file, setFile] = useState(null)


    const fetchUser = async()=>{
  try {
      const user = await axios.get(`${API_BASE_URL}/dashboard/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
      console.log(user)
  } catch (error) {
    console.log(error)
  }
    }

  const fetchTeachers =async()=>{
try {
   const teachers = await axios.get(`${API_BASE_URL}/allteachers`)
   setAllTeachers(teachers.data)
} catch (error) {
  console.log(error)
}
  }

const addproject =async(e)=>{
  e.preventDefault()
try {
  const projects = await axios.post(`${API_BASE_URL}/addproject`,{
    studentId:id,
    teacherId,
    project,
    description
  })
  setProject("")
  setDescription("")
  setTeacherId("")
  fetchProjects()
  toast.success("Project Added Sucessfully")
} catch (error) {
  
}
}


const fetchProjects =async()=>{
try {
  const projectsDetails = await axios.get(`${API_BASE_URL}/student/projects`,{
    headers:{
      studentid :`${id}`
    }
  })
  setProjects(projectsDetails.data)
  setIsLoading(false)
} catch (error) {
  console.log(error)
}
}

const logout=()=>{
  localStorage.clear()
  navigate("/")
}
const deleteProject=async(pid)=>{
  try {
     const deleteProject = await axios.delete(`${API_BASE_URL}/delete/project/${pid}`)
     fetchProjects()
     toast.success("Project Deleted Sucessfully")
  } catch (error) {
    console.log(error)
  }
}

      useEffect(()=>{
        fetchUser(),
        fetchTeachers(),
        fetchProjects()
    },[])

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <style>{`
        @keyframes dashboard-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .dashboard-rise { animation: dashboard-rise .55s ease both; }
        .dashboard-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .dashboard-card:hover { transform: translateY(-4px); box-shadow: 0 18px 45px rgba(30, 64, 175, .10); }
        .dashboard-input { transition: border-color .2s ease, box-shadow .2s ease, background .2s ease; }
        .dashboard-input:focus { background: white; border-color: #6366f1 !important; box-shadow: 0 0 0 4px rgba(99, 102, 241, .10); }
      `}</style>

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-24 items-center gap-3 px-7">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Icon name="dashboard" className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">Student Hub</p>
            <p className="text-xs font-medium text-slate-400">Project workspace</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          <div className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</div>
          <button type="button" className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
            <Icon name="dashboard" /> Dashboard
          </button>
          <button type="button" onClick={() => document.getElementById('student-projects')?.scrollIntoView({ behavior: 'smooth' })} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
            <Icon name="folder" /> My Projects
          </button>
          <button type="button" onClick={() => document.getElementById('submit-project')?.scrollIntoView({ behavior: 'smooth' })} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
            <Icon name="plus" /> New Project
          </button>
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              {(data.name || "S").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">{data.name || "Student"}</p>
              <p className="text-xs text-slate-400">Student account</p>
            </div>
          </div>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600">
            <Icon name="logout" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <header className="border-b border-slate-200/80 bg-white/90 px-5 py-5 backdrop-blur md:px-8 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">Student workspace</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Welcome back, {data.name || "Student"}!</h1>
              <p className="mt-1 text-sm text-slate-500">Track submissions and keep your projects moving forward.</p>
            </div>
            <button onClick={logout} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:hidden">
              <Icon name="logout" /> Logout
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 lg:px-10">
          <section className="dashboard-rise grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="dashboard-card rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon name="folder" className="h-6 w-6" /></div>
                <span className="text-xs font-bold text-indigo-500">ALL TIME</span>
              </div>
              <p className="mt-5 text-3xl font-bold">{projects.length}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Total projects</p>
            </div>
            <div className="dashboard-card rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Icon name="check" className="h-6 w-6" /></div>
                <span className="text-xs font-bold text-emerald-500">APPROVED</span>
              </div>
              <p className="mt-5 text-3xl font-bold">{projects.filter((item) => item.status === "Approved").length}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Completed projects</p>
            </div>
            <div className="dashboard-card rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 text-amber-600"><Icon name="clock" className="h-6 w-6" /></div>
                <span className="text-xs font-bold text-amber-500">IN REVIEW</span>
              </div>
              <p className="mt-5 text-3xl font-bold">{projects.filter((item) => item.status !== "Approved" && item.status !== "Rejected").length}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Pending review</p>
            </div>
          </section>

          <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,.8fr)]">
            <section id="student-projects" className="dashboard-rise">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">Overview</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">My projects</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm ring-1 ring-slate-200">{projects.length} total</span>
              </div>

              <div className="space-y-4">
                {isLoading && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-8">
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-100 border-t-indigo-600" />
                      Loading your projects...
                    </div>
                  </div>
                )}

                {!isLoading && projects.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-14 text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-indigo-500 shadow-sm"><Icon name="folder" className="h-7 w-7" /></div>
                    <h3 className="mt-4 font-bold text-slate-800">No projects yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Submit your first project to begin tracking its progress.</p>
                    <button type="button" onClick={() => document.getElementById('submit-project')?.scrollIntoView({ behavior: 'smooth' })} className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">Create project</button>
                  </div>
                )}

                {projects.map((item, index) => {
                  const approved = item.status === "Approved"
                  const rejected = item.status === "Rejected"
                  const statusStyle = approved ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : rejected ? "bg-red-50 text-red-700 ring-red-200" : "bg-amber-50 text-amber-700 ring-amber-200"

                  return (
                    <article key={item._id} className="dashboard-card dashboard-rise rounded-2xl border border-slate-200 bg-white p-5 md:p-6" style={{ animationDelay: `${index * 70}ms` }}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-4">
                          <div className={`mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-xl ${approved ? "bg-emerald-50 text-emerald-600" : rejected ? "bg-red-50 text-red-500" : "bg-indigo-50 text-indigo-600"}`}>
                            <Icon name="folder" className="h-6 w-6" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-lg font-bold text-slate-900">{item.project}</h3>
                            <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                          </div>
                        </div>
                        <span className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${statusStyle}`}>{item.status}</span>
                      </div>
                      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600"><Icon name="user" className="h-4 w-4" /></div>
                          <span>Guide:</span>
                          <strong className="font-semibold text-slate-700">{item.teacherId?.name || "Not assigned"}</strong>
                        </div>
                        <button onClick={() => deleteProject(item._id)} className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                          <Icon name="trash" className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>

            <section id="submit-project" className="dashboard-rise overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-6">
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20"><Icon name="plus" className="h-6 w-6" /></div>
                  <div>
                    <h2 className="text-xl font-bold">Submit a project</h2>
                    <p className="mt-0.5 text-sm text-indigo-100">Add details for review</p>
                  </div>
                </div>
              </div>

              <form onSubmit={addproject} className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Project name</label>
                  <input type="text" required value={project} onChange={(e) => setProject(e.target.value)} placeholder="Enter project title" className="dashboard-input w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                  <textarea required rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe your project..." className="dashboard-input resize-none w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Select teacher</label>
                  <select required value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="dashboard-input w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none">
                    <option value="">Choose a teacher</option>
                    {allTeachers.map((teacher) => <option key={teacher._id} value={teacher._id}>{teacher.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Project PDF</label>
                  <label className="dashboard-input flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-500 hover:border-indigo-400 hover:bg-indigo-50/40">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-indigo-600 shadow-sm"><Icon name="upload" /></div>
                    <span className="min-w-0 truncate">{file ? file.name : "Choose a PDF file"}</span>
                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="sr-only" />
                  </label>
                </div>

                <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0">
                  Submit project <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default StudentDashboard