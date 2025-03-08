import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createLaundryValidations,updateLaundryValidations } from '../../validations/lanudry/lanudry';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const lanudryRoutr=express.Router();
const lanudryService=new genericService(prisma.laundry)
const lanudryController=new genericController(lanudryService)

lanudryRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(lanudryController.getAll.bind(lanudryController)))
lanudryRoutr.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),lanudryController.getById.bind(lanudryController))
lanudryRoutr.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createLaundryValidations,lanudryController.create.bind(lanudryController))
lanudryRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateLaundryValidations,lanudryController.update.bind(lanudryController))
lanudryRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),lanudryController.delete.bind(lanudryController))

export default lanudryRoutr