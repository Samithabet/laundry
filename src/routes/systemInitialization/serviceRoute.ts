import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createServiceValidations,updateServiceValidations } from '../../validations/systemInitialization/serviceValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const serviceRoute=express.Router();
const serviceService=new genericService(prisma.service)
const serviceController=new genericController(serviceService)

serviceRoute.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(serviceController.getAll.bind(serviceController)))
serviceRoute.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),serviceController.getById.bind(serviceController))
serviceRoute.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createServiceValidations,serviceController.create.bind(serviceController))
serviceRoute.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateServiceValidations,serviceController.update.bind(serviceController))
serviceRoute.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),serviceController.delete.bind(serviceController))

export default serviceRoute