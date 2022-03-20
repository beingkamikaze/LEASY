const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    mobile : {
        type:Number,
        required:true,
        unique:true
    },
    adhaar : {
        type:Number,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    pswrepeat : {
        type:String,
        required:true
    }
})

//Now we need to cretae collection
const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;