const express = require('express')
const adminsRouter = express.Router()


const { register, login, logout} = require('../controllers/adminsController')

adminsRouter.post('/auth/admin/register', register)
adminsRouter.post('/auth/admin/login', login)
adminsRouter.post('/auth/admin/logout', logout)

module.exports = adminsRouter