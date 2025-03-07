import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import authController from '../../controllers/auth/authController';
import { createEmployValidations,updatEemployValidations } from '../../validations/employ/employ';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import asyncHandler from '../../utility/asyncHandler';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const userRoutr=express.Router();
const userService=new genericService(prisma.user)
const userController=new genericController(userService)

userRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN,RoleName.USPER_ADMIN]),authController.getAllEmployees)
userRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updatEemployValidations,userController.update.bind(userController))
userRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),userController.delete.bind(userController))

export default userRoutr