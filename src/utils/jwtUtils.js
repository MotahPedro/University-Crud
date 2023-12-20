const jwt = require("jsonwebtoken");

/**
 * @typedef {'teacher' | 'student' | 'admin'} jwtRoles
 */

/**
 * @typedef {Object} jwtEntitie
 * @property {string} _id
 * @property {string} name
 */

/**
 * 
 * @param {jwtEntitie} entitie 
 * 
 * @param {jwtRoles} role 
 * 
 *  @returns {string} 
 * 
 */

function createJwt(entitie, role) {
  return jwt.sign(
    { id: entitie._id, name: entitie.name, role: role },
    process.env.JWT_SECRET,
    { expiresIn: Number(process.env.JWT_LIFETIME) }
  );
}

/**
 * Define um cookie de resposta com o token JWT.
 * @param {string} token - O token JWT a ser definido no cookie.
 * @param {import('express').Response} res - O objeto de resposta do Express.
 */
function setResponseCookie(token, res) {
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + Number(process.env.JWT_LIFETIME) * 1000),
    signed: true,
  });
}

module.exports = { createJwt, setResponseCookie };
