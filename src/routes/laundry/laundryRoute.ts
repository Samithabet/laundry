import express from 'express';
import laundryController from '../../controllers/laundry/laundryController';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import { lanudryWithownerValidations } from '../../validations/lanudry/lanudryWithowner';
import{RoleName} from '../../enum/role'
const laundryRoutr=express.Router();


laundryRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN,RoleName.USPER_ADMIN]),laundryController.getAllLaundry)
laundryRoutr.post('/',isAuthenticated,hasPermission([RoleName.USPER_ADMIN]),lanudryWithownerValidations,laundryController.createLaundry)
export default laundryRoutr