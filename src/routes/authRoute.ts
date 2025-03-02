import express from 'express';
import authController from '../controllers/authController';
import { registerValidations } from '../validations/register';
import isAuthenticated from '../middlewares/isAuthenticated';
import { hasPermission } from '../middlewares/hasPermission';
import{RoleName} from '../enum/role'
const authRoutr=express.Router();


authRoutr.post('/login',authController.Login)
authRoutr.post('/register',isAuthenticated,hasPermission([RoleName.ADMIN,RoleName.USPER_ADMIN]),registerValidations,authController.Register)
export default authRoutr