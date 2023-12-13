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
      student: { _id: student._id, name: student.name, role: "student" },
      msg: "Logged in successfully",
    });
};