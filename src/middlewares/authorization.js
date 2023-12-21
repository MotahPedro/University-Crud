const customApiErrors = require('../errors/customApiErrors')

const authorizePermissions = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role

        if (!requiredRoles.includes(userRole)) {
            throw new customApiErrors.UnauthenticatedError('You are not authorized to access this route.')
        }

        next()
    }
}

module.exports = authorizePermissions;