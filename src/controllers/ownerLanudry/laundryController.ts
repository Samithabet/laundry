import { Request, Response, NextFunction } from 'express'
import { validationResult } from "express-validator";
import { BadRequest } from "http-errors";
import laundryService from '../../services/ownerLanudry/laundryService';


class LaundryController {
    public async createLaundry(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new BadRequest(errors.array()[0].msg);
            }
            const  data = req.body;
            const user= req.user;
            const laundry = await laundryService.createLaundry(user,data);
            res.status(200).json(laundry);
        } catch (error) {

            next(error)
        }
    }
 
  
}

export default new LaundryController();


