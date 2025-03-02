import authService from "../services/authService";
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
    public async Register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                 throw new BadRequest(errors.array()[0].msg );

            }
            const Data= req.body;
            const user=req.user;
            const Register = await authService.Register(user,Data);
            res.status(200).json(Register);
        } catch (error) {

            
            next(error)
        }
    }
}

export default new AuthController();



