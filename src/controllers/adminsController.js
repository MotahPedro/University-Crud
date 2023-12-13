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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomApiErrors.BadRequestError(
      "Please provide email and password"
    );
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const token = createJwt(admin, "admin");
  setResponseCookie(token, res);

  return res
    .status(StatusCodes.OK)
    .json({
      admin: { _id: admin._id, name: admin.name, role: "admin" },
      msg: "Logged in successfully",
    });
};
