import express from 'express';
import { loginUser, registerUser, adminLogin, listUser, deleteUser, addSubOrder } from '../controller/userController.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/list-user', listUser);
userRouter.delete('/delete-user/:id', deleteUser);
userRouter.post('/add-suborder', addSubOrder);

export default userRouter;