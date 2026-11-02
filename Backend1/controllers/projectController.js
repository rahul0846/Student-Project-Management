const Project = require('../models/projectSchema')

const addProject = async(req,res)=>{
try {
    const project = await Project.create(req.body)
    res.status(201).json({message:"Project Added" , project})
} catch (error) {
    res.status(400).json(error)
}
}

const approveProject =async(req,res)=>{
try {
    const project = await Project.findById(req.params.id)
    project.status ="approved"
    await project.save()
    res.status(200).json({message:"Project Approved" , project})

} catch (error) {
     res.status(400).json(error)
}
}
const rejectProject =async(req,res)=>{
try {
    const project = await Project.findById(req.params.id)
    project.status ="rejected"
    await project.save()
    res.status(200).json({message:"Project Project" , project})

} catch (error) {
     res.status(400).json(error)
}
}

const studentProjects =async(req,res)=>{
try {
    const studentId = req.headers.studentid
    if(!studentId){
      return res.status(400).json({message:"Id is required"})
    }

    const projects = await Project.find({studentId}).populate("teacherId" , "name email")
  res.status(200).json(projects)

} catch (error) {
    res.status(400).json(error)
}
}

const teacherProjects = async(req,res)=>{
try {
const teacherId = req.headers.teacherid
if(!teacherId){
    return res.status(401).json({mesage:"teacherId is Required"})
}
    const projects = await Project.find({teacherId}).populate("studentId", "name email")
    res.status(200).json(projects)
    
} catch (error) {
    res.status(400).json(error)
}
}

const deleteProject =async(req,res)=>{
try {
    const deleteProject = await Project.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Project deleted Sucessfully"})
} catch (error) {
     res.status(400).json(error)
}
}

module.exports ={addProject , approveProject,rejectProject , studentProjects ,deleteProject , teacherProjects}