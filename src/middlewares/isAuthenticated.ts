import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError,BadRequest } from "http-errors";
import dotenv from "dotenv";
dotenv.config();
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) throw new BadRequest("User not logged in");
        const decoded = jwt.verify(token, "process.env.JWT_SECRET")as any;
        req.user = decoded;          

     
       
    } catch (error) {
        throw new BadRequest( "Unauthorized");
    }
}