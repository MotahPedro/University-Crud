const express = require('express')
const teachersRouter = express.Router()


const { register, login} = require('../controllers/teachersController')
const { logout } = require("../controllers/adminsController");

teachersRouter.post('/auth/teacher/register', register)
teachersRouter.post('/auth/teacher/login', login)
teachersRouter.post('/auth/teacher/logout', logout)

module.exports = teachersRouter