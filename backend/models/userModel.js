// authantocation
import mongoose from "mongoose";
import validator from  'validator'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import  crypto from 'crypto'
const userSchema= new mongoose.Schema({
    name: {
    type: String,
    required:[true,"Please Enter Your name"],
    maxLength:[25, "Invalid name. Please ENter mAx length 25."],
    minLength:[3, "Invalid name, Please Enter min 3 characters"],
    },
    email:{
        type: String,
        required:[true,"Please Enter Youremail"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"]
    },
    password:{
        type: String,
        required:[true,"Please Enter Your password"],
        minLength:[8, "Password should be more then 8 characters"],
        select:false//pass will not show to admin
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
        role: {
            type:String,
            default:"user"
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date

},{timestamps:true})

// pass hashing
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next(); // ✅ skip hashing if password is not modified
    }
    this.password = await bcrypt.hash(this.password, 10); // ✅ hash if modified
    next();
});
// custom method in sechema
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};
// verification of password
userSchema.methods.verifyPassword = async function (userEnteredPassWord){
    return await bcrypt.compare(userEnteredPassWord,this.password);
}

// gentrating token
userSchema.methods.generatePasswordResetToken = function(){
    const resetToken= crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+30*60*1000;
    return resetToken;
}
export default mongoose.model("User",userSchema);