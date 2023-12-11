import mongoose, { model } from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "the field is required"]
    },
    
    email:{
        type:String,
        required:[true, "the field is required"],
        unique:true,
        match: [/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/, 'Invalid email'],
    
    },
    password:{
        type:String,
        required:[true, "the field is required"],
    },
})

module.exports = mongoose.model("Student", studentSchema)