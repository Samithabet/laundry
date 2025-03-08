import express from 'express';
import laundryController from '../../controllers/ownerLanudry/laundryController';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import { lanudryWithownerValidations } from '../../validations/ownerLanudry/lanudryWithowner';
import{RoleName} from '../../enum/role'
const laundryRoutr=express.Router();


laundryRoutr.post('/',isAuthenticated,hasPermission([RoleName.USPER_ADMIN]),lanudryWithownerValidations,laundryController.createLaundry)
export default laundryRoutr