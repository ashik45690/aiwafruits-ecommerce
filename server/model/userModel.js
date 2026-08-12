import mongoose from 'mongoose'

const UserData = mongoose.Schema({
    fullname:{type:String},
    email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    checkbox:{type:Boolean,default:false},

    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date},
    otp: {
  type: String,
  default: null,
},

otpExpiry: {
  type: Date,
  default: null,
},
})

const UserDatabase = mongoose.model('UserData',UserData);
export {UserDatabase}