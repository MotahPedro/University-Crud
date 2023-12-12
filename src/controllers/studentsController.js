const Student = require('../models/studentsModel')
const {StatusCodes} = require('http-status-codes')
const CustomApiErrors = require('../errors')


const register = async (req,res) => {
    const student = await Student.create(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({
        student: { _id: student._id, name: student.name, role: "student" },
      });
}