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
