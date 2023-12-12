const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "the field is required"]
    },

    email: {
        type: String,
        required: [true, "the field is required"],
        unique: true,
        match: [/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/, 'Invalid email'],

    },
    password: {
        type: String,
        required: [true, "the field is required"],
    },
});

teacherSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

teacherSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await brypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("Teacher", teacherSchema)