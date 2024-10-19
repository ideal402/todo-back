const mongoose = require("mongoose")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken");
require("dotenv").config()
const JWT_SECRET_KRY = process.env.JWT_SECRET_KRY


const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pw:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.methods.toJSON = function() {
    const obj = this._doc
    delete obj.pw 
    
    return obj
}
userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id}, JWT_SECRET_KRY, 
        {expiresIn:'30m'}
    );
    return token
};

const User = mongoose.model("User", userSchema)

module.exports = User;