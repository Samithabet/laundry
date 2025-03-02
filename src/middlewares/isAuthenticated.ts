import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Forbidden, Unauthorized } from "http-errors";
import { JWT_SECRET } from '../conf/env';
import prisma from "../conf/db";
import dotenv from "dotenv";
dotenv.config();

interface Decoded {
    email: string;
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Unauthorized("User not logged in");
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET!) as Decoded;

        // Find the user in the database
        const user = await prisma.user.findFirst({ where: { email: decoded.email } });
        if (!user) {
            throw new Forbidden("User is Forbidden");
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle errors and send a response to the client
        if (error instanceof Unauthorized) {
            next( error );
        } else if (error instanceof Forbidden) {
            next( error );
        } 
    }
};

export default isAuthenticated;