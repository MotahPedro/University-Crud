const Student = require('../models/studentsModel')
const {StatusCodes} = require('http-status-codes')
const CustomApiErrors = require('../errors/customApiErrors')
const {createJwt, setResponseCookie} = require('../utils/jwtUtils')

const register = async (req,res) => {
    const student = await Student.create(req.body);

    res.status(StatusCodes.CREATED).json({
        student: { _id: student._id, name: student.name, role: "student" },
      });
}

const login = async (req,res) =>{
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomApiErrors.BadRequestError("Please provide email and password");
  }

  const student = await Student.findOne({ email });
  if (!student) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomApiErrors.UnauthenticatedError("Invalid Credentials");
  }

  const token = createJwt(student, 'student')
  setResponseCookie(token, res)

  return res.status(StatusCodes.OK).json({ student: {_id: student._id, name: student.name, role: 'student'}, msg: 'Logged in successfully'})
}