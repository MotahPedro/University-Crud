const jwt = require("jsonwebtoken");
const customApiErrors = require("../errors/customApiErrors");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customApiErrors.UnauthorizedError(
      "You need to be logged in to access this route!"
    );
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: payload.id, name: payload.name, role: payload.role };

  next();
};

module.exports = authenticateUser;
