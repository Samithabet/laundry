import authService from "../services/authService";
import { Request, Response, NextFunction } from 'express'

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
            const Data= req.body;
            const user=req.user;
            const userWithToken = await authService.Register(user,Data);
            res.status(200).json(userWithToken);
        } catch (error) {

            
            next(error)
        }
    }
}

export default new AuthController();



