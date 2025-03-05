import express from 'express';
import { loginUser, registerUser, adminLogin, listUser } from '../controller/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/list-user', listUser)

export default userRouter;