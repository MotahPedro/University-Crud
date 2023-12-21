const express = require('express')
const studentsRouter = express.Router()


const { register, login, logout} = require('../controllers/studentsController')

studentsRouter.post('/auth/student/register', register)
studentsRouter.post('/auth/student/login', login)
studentsRouter.post('/auth/student/logout', logout)

module.exports = studentsRouter