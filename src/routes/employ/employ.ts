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
const employRoutr=express.Router();
const employService=new genericService(prisma.user)
const employController=new genericController(employService)

employRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),authController.getAllEmployees)
employRoutr.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createEmployValidations,employController.create.bind(employController))
employRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updatEemployValidations,employController.update.bind(employController))
employRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),employController.delete.bind(employController))

export default employRoutr