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

const findAll = async (req,res) => {
  const students = Student.require({})
  select("-password");

  return res.status(StatusCodes.OK).json({students})
}

const findById = async (req,res) => {
  const student = Student.findById(req.params.id).select

  if(student) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }

  return res.status(StatusCodes.OK).json({student})
}

const updateById = async (req, res) => {
  const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");
  if (!updateStudent) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }
  return res.status(StatusCodes.OK).json({ updateStudent });
};

const deleteById = async (req, res) => {
  const student = await Student.findOneAndDelete(req.params.id);

  if (!student) {
    throw new CustomApiErrors.NotFoundError(
      `No item found with _id: ${req.params.id}`
    );
  }

  return res.status(StatusCodes.OK).json({ msg: "Student deleted successfully" });
};


module.exports = {
  register,
  login,
  findAll,
  findById,
  updateById,
  deleteById
};