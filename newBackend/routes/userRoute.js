import express from 'express';
import { loginUser, registerUser, adminLogin, listUser, deleteUser } from '../controller/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/list-user', listUser);
userRouter.delete('/delete-user/:id', deleteUser);


export default userRouter;