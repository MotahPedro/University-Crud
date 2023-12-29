const Teacher = require("../models/teachersModel");
const { StatusCodes } = require("http-status-codes");
const CustomApiErrors = require("../errors/customApiErrors");
const { createJwt, setResponseCookie } = require("../utils/jwtUtils");

const register = async (req, res) => {
  const teacher = await Teacher.create(req.body);

  res.status(StatusCodes.CREATED).json({
    teacher: { _id: teacher._id, name: teacher.name, role: "teacher" },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomApiErrors.BadRequestError(
      "Please provide email and password"
    );
  }

  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await teacher.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const token = createJwt(teacher, "teacher");
  setResponseCookie(token, res);

  return res
    .status(StatusCodes.OK)
    .json({
      teacher: { _id: teacher._id, name: teacher.name, role: "teacher" },
      msg: "Logged in successfully",
    });
};

const findAll = async (req, res) => {
  const teachers = Teacher.require({}).select("-password");

  return res.status(StatusCodes.OK).json({ teachers });
};

const findById = async (req, res) => {
  const teacher = Teacher.findById(req.params.id).select;

  if (teacher) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }

  return res.status(StatusCodes.OK).json({ teacher });
};

const updateById = async (req, res) => {
  const updateTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  ).select("-password");
  if (!updateTeacher) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }
  return res.status(StatusCodes.OK).json({ updateTeacher });
};

const deleteById = async (req, res) => {
  const teacher = await Teacher.findOneAndDelete(req.params.id);

  if (!teacher) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Teacher deleted successfully" });
};

module.exports = {
    register,
    login,
    findById,
    updateById,
    deleteById
}