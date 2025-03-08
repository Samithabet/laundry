import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import washRequestController from '../../controllers/washing/washRequestController';
// import { createCustomerValidations,updateCustomerValidations } from '../../validations/systemInitialization/customerValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const washRequest=express.Router();
const washingService=new genericService(prisma.washing)
const washingController=new genericController(washingService)

washRequest.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(washingController.getAll.bind(washingController)))

washRequest.post('/',(washRequestController.washReques))


export default washRequest