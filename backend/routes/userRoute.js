import express, { Router } from 'express'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { deleteUser, getSingleUser, getUserDetails, getUserList, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controller/userController.js';
const router=express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/password/forgot").post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verifyUserAuth, getUserDetails);
router.route("/password/update").put(verifyUserAuth, updatePassword);

router.route("/profile/update").put(verifyUserAuth, updateProfile);

router.route("/admin/users").get(verifyUserAuth,roleBasedAccess("admin"), getUserList);
router.route("/admin/user/:id").get(verifyUserAuth,roleBasedAccess("admin"), getSingleUser)
.put(verifyUserAuth,roleBasedAccess("admin"),updateUserRole)
.delete(verifyUserAuth,roleBasedAccess("admin"), deleteUser);

export default router;