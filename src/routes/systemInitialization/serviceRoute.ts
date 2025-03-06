import express from 'express';
import genericService from '../../services/genericService';
import genericController from '../../controllers/genericController';
import { createServiceValidations,updateServiceValidations } from '../../validations/systemInitialization/serviceValidation';
import isAuthenticated from '../../middlewares/isAuthenticated';
import { hasPermission } from '../../middlewares/hasPermission';
import{RoleName} from '../../enum/role'
import prisma from '../../conf/db';
const clothesRoutr=express.Router();
const clothesService=new genericService(prisma.service)
const clothesController=new genericController(clothesService)

clothesRoutr.get('/',isAuthenticated,hasPermission([RoleName.ADMIN]),(clothesController.getAll.bind(clothesController)))
clothesRoutr.get('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),clothesController.getById.bind(clothesController))
clothesRoutr.post('/',isAuthenticated,hasPermission([RoleName.ADMIN]),createServiceValidations,clothesController.create.bind(clothesController))
clothesRoutr.patch('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),updateServiceValidations,clothesController.update.bind(clothesController))
clothesRoutr.delete('/:id',isAuthenticated,hasPermission([RoleName.ADMIN]),clothesController.delete.bind(clothesController))

export default clothesRoutr