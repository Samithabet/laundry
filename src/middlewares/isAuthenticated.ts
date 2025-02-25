import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Forbidden,Unauthorized } from "http-errors";
import{JWT_SECRET} from '../conf/env'
import prisma from "../conf/db";
import dotenv from "dotenv";
dotenv.config();
interface Decoded{
    email:string
}
const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Unauthorized("User not logged in");
        const decoded = jwt.verify(token, JWT_SECRET!)as Decoded;
        const user =  await prisma.user.findFirst({where:{email:decoded.email}});
        if(!user){
            throw new Forbidden("User is Forbidden");
        }
        req.user = user!;          

        next();
       
    } catch (error) {
        throw new Forbidden( "User is Forbidden");
    }
}
export default isAuthenticated