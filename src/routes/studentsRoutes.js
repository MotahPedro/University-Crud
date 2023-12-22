const express = require('express')
const studentsRouter = express.Router()


const { register, login} = require('../controllers/studentsController')
const { logout } = require("../controllers/adminsController");

studentsRouter.post('/auth/student/register', register)
studentsRouter.post('/auth/student/login', login)
studentsRouter.post('/auth/student/logout', logout)

module.exports = studentsRouter