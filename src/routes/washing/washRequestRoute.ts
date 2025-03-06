import express from 'express';
import washRequestController from '../../controllers/washing/washRequestController';
// import { createCustomerValidations,updateCustomerValidations } from '../../validations/systemInitialization/customerValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
const washRequest=express.Router();



washRequest.get('/',(washRequestController.washReques))


export default washRequest