import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createServiceTypeValidations,updateServiceTypeValidations } from '../../validations/systemInitialization/serviceTypeValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const serviceTypeRoutr=express.Router();
const serviceTypeService=new genericService(prisma.serviceType)
const serviceTypeController=new genericController(serviceTypeService)

serviceTypeRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(serviceTypeController.getAll.bind(serviceTypeController)))
serviceTypeRoutr.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),serviceTypeController.getById.bind(serviceTypeController))
serviceTypeRoutr.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createServiceTypeValidations,serviceTypeController.create.bind(serviceTypeController))
serviceTypeRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateServiceTypeValidations,serviceTypeController.update.bind(serviceTypeController))
serviceTypeRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),serviceTypeController.delete.bind(serviceTypeController))

export default serviceTypeRoutr