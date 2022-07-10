const express = require("express");
const { userRegisterCtrl, loginUserCtrl,fetchUsersCtrl,deleteUsersCtrl,fetchUserDetailsCtrl } = require("../../controllers/user/userContrl");
const authMiddleware = require("../../middleware/auth/authMiddleWare");

const userRouter = express.Router()
userRouter.post("/register", userRegisterCtrl )
userRouter.post("/login", loginUserCtrl)
userRouter.get('/',authMiddleware, fetchUsersCtrl)
userRouter.delete('/:id',deleteUsersCtrl)
userRouter.get('/:id',fetchUserDetailsCtrl)


module.exports = userRouter
