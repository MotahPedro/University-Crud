const Admin = require("../models/adminsModel");
const { StatusCodes } = require("http-status-codes");
const CustomApiErrors = require("../errors/customApiErrors");
const { createJwt, setResponseCookie } = require("../utils/jwtUtils");

const register = async (req, res) => {
  if (req.body.key !== process.env.ADMIN_KEY) {
    return CustomApiErrors.UnauthorizedError("Invalid admin key");
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

  return res.status(StatusCodes.OK).json({
    admin: { _id: admin._id, name: admin.name, role: "admin" },
    msg: "Logged in successfully",
  });
};

const logout = async (req, res) => {
  res.clearCookie("token");

  return res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

const findAll = async (req, res) => {
  const admins = await Admin.find({}).select("-password");

  return res.status(StatusCodes.OK).json({ admins });
};

const findById = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");
  if (!admin) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }
  return res.status(StatusCodes.OK).json({admin})
}

const updateById = async (req,res) =>{
  const updateAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");
  if (!updateAdmin) {
    throw new CustomApiErrors.NotFoundError(`No item found with _id: ${req.params.id}`)
  }
  return res.status(StatusCodes.OK).json({updateAdmin})
}

const deleteById = async (req,res) => {
  const admin = await Admin.findOneAndDelete(req.params.id)

  if (!admin) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }

  return res.status(StatusCodes.OK).json({msg: 'Admin deleted successfully'})

}

module.exports = {
  register,
  login,
  logout,
  findAll,
  findById,
  updateById,
  deleteById
};
