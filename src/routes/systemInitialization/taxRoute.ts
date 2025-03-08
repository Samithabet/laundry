import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createTaxValidations,updateTaxValidations } from '../../validations/Notifications&Bill&Tax/taxValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const taxRoutr=express.Router();
const taxService=new genericService(prisma.tax)
const taxController=new genericController(taxService)

taxRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(taxController.getAll.bind(taxController)))
taxRoutr.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),taxController.getById.bind(taxController))
taxRoutr.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createTaxValidations,taxController.create.bind(taxController))
taxRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateTaxValidations,taxController.update.bind(taxController))
taxRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),taxController.delete.bind(taxController))

export default taxRoutr