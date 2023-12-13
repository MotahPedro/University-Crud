const Admin = require("../models/adminsModel");
const { StatusCodes } = require("http-status-codes");
const CustomApiErrors = require("../errors/customApiErrors");
const { createJwt, setResponseCookie } = require("../utils/jwtUtils");

const register = async (req, res) => {
    if(req.body.key !== process.env.ADMIN_KEY) {
        return CustomApiErrors.UnauthorizedError('Invalid admin key')
    }

  const admin = await Admin.create(req.body);

  res.status(StatusCodes.CREATED).json({
    admin: { _id: admin._id, name: admin.name, role: "admin" },
  });
};
