import crypto from 'crypto'
import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from 'cloudinary';
import { url } from 'inspector';
export const registerUser= handleAsyncError(async(req, res, next)=>{
    const {name,email,password ,avatar}=req.body;
    const myCloud=await cloudinary.uploader.upload(avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
    })
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
    sendToken(user,201,res);

})
// login
export const loginUser=handleAsyncError(async(req, res, next)=>{
    const {email, password}=req.body;
    if(!email || !password){
        return next(new HandleError("Email or password nedded",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new HandleError("Invalid Email or password" ,401))
    }
    
    const isPasswordValid= await user.verifyPassword(password);
    if(!isPasswordValid){
        return next(new HandleError("Invalid Email or password ",401))
    }
// helper funtion
    sendToken(user,200,res);
})
// logout funtion
export const logout= handleAsyncError(async(req, res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Successfully logout"
    })
})

// forgot password
export const requestPasswordReset= handleAsyncError(async(req,res, next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new HandleError("User doesnt exit" ,401));
    }
    let resetToken;
    try {
        resetToken=user.generatePasswordResetToken();
        // console.log(resetToken);
        await user.save({validateBeforeSave:false})
    } catch (error) {
        // console.log(error);
        
        return next(new HandleError("could not send reset token please try again later" ,500));    
    }
// http://localhost/api/v1/reset/af44aa1485ee0be69939df15df77e3641a947cad
// `${req.protocol}://${req.get('host')}/reset/${resetToken}`
// http://localhost:5173/reset/aa1e51e430a30ff6f8e1b937345e53b282142843
    const resetPasswordURL=`${req.protocol}://${req.get('host')}/reset/${resetToken}`;
    // console.log(resetPasswordURL);
    const message=`Use this link for reset the password: ${resetPasswordURL}.\n This url will expire within 30min`;
    try {
        // send email
        await sendEmail({
            email:user.email,
            subject:"Password Reset Request",
            message
        })
        res.status(200).json({
            success:true,
            message:`Email is send to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new HandleError("Email could not send please try again later" ,500));    

    }
    
})

// reset password
export const resetPassword = handleAsyncError(async(req, res, next)=>{
    console.log(req.params.token);
    
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new HandleError("Invalid or has been expire" ,400))
    }
    const {password, confirmPassword}=req.body;
    if(password!=confirmPassword){
        return next(new HandleError("New password and confrom password should be same." ,401))
    }
    user.password=password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user,200,res);
})

 
// Get user details
export const getUserDetails=handleAsyncError(async(req, res, next)=>{
    const user=await User.findById(req.user.id)
    // console.log(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
    
})

// updating passowrd
export const updatePassword=handleAsyncError(async(req,res,next)=>{
    const {oldPassword, newPassword, conformPassword}=req.body;
    const user=await User.findById(req.user.id).select('+password');
    const checkPasswordMatch=await user.verifyPassword(oldPassword);
    if(!checkPasswordMatch){
        return next(new HandleError("Old password is incorrect" ,400))
    }
    if(newPassword!==conformPassword){
        return next(new HandleError("Passwod doesn't match" ,400))
    }
    user.password=newPassword;
    await user.save();
    sendToken(user, 200, res);
})

// updatig user profile -- emial and profile pic
export const updateProfile=handleAsyncError(async(req,res,next)=>{
    const {name,email,avatar}=req.body;
    const updateUserDetails={
        name,
        email
    }
    if(avatar!==" "){
        const user= await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.uploader.destroy(imageId);
        const myCloud=await cloudinary.uploader.upload(avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
        })
        updateUserDetails.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    }
    const user=await User.findByIdAndUpdate(req.user.id, updateUserDetails, {
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        user
    })
})


// admin geting user info
export const getUserList=handleAsyncError(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

// getiing a single details of user
export const getSingleUser=handleAsyncError(async(req,res,next)=>{
    // console.log(req.params.id);
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new HandleError(`User doen't exit with this id: ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        user
    })
})

// allowing admin to change the role
export const updateUserRole=handleAsyncError(async(req,res,next)=>{
    const {role}=req.body;
    const newUserData={
        role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators:true
    })

    if(!user){
        return next(new HandleError("User doesn't exist",400))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// delete user profile
export const deleteUser=handleAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new HandleError("User doesn't exist",400))
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"User is deleted successfully"
    })
})