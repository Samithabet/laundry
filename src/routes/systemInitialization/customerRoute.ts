import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createCustomerValidations,updateCustomerValidations } from '../../validations/systemInitialization/customerValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const customerRoute=express.Router();
const customerService=new genericService(prisma.customer)
const customerController=new genericController(customerService)

customerRoute.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(customerController.getAll.bind(customerController)))
customerRoute.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),customerController.getById.bind(customerController))
customerRoute.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createCustomerValidations,customerController.create.bind(customerController))
customerRoute.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateCustomerValidations,customerController.update.bind(customerController))
customerRoute.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),customerController.delete.bind(customerController))

export default customerRoute