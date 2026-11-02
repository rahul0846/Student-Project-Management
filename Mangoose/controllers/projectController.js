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

module.exports ={addProject , approveProject,rejectProject}