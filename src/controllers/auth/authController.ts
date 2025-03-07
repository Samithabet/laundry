import authService from "../../services/auth/authService";
import { Request, Response, NextFunction } from 'express'
import { validationResult } from "express-validator";
import { BadRequest } from "http-errors";

class AuthController {
    public async Login(req: Request, res: Response, next: NextFunction) {
        try {
            const {userName,password} = req.body;
            const userWithToken = await authService.Login(userName,password);
            res.status(200).json(userWithToken);
        } catch (error) {

            
            next(error)
        }
    }
    public async getAllEmployees(req: Request, res: Response, next: NextFunction) {
        try {
            const user=req.user
            const userWithToken = await authService.getAllEmployees(user,req.query);
            res.status(200).json(userWithToken);
        } catch (error) {

            
            next(error)
        }
    }
   
}

export default new AuthController();



