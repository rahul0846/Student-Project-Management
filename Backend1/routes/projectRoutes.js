const routes = require('express').Router()
const {addProject , approveProject,rejectProject ,teacherProjects, studentProjects ,deleteProject} = require('../controllers/projectController')
const {verifyToken} = require('../middleware/authMiddle')

routes.post("/addproject", addProject)
routes.patch("/project/:id/approve", approveProject)
routes.patch("/project/:id/reject", rejectProject)
routes.get('/student/projects' , studentProjects)
routes.get('/teacher/projects' , teacherProjects)
routes.delete('/delete/project/:id' , deleteProject)

module.exports = routes