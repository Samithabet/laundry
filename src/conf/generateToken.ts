import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "./env";
import { BadRequest } from "http-errors";


dotenv.config();

export const generateToken = (user: any): string => {  
    ; // Ensure JWT_SECRET is in .env file
    return jwt.sign({ email: user.email }, JWT_SECRET!, { expiresIn: '7d' });
  };
  export const generateTokenForLaundry = (user: any): string => {  
    ; // Ensure JWT_SECRET is in .env file
    return jwt.sign({ laundryId: user.laundryId }, JWT_SECRET!, { expiresIn: '7d' });
  };
export async function hashPassword(password: string):Promise<string> {
    try{
       
        
        const salt = await bcrypt.genSalt(10);
     
        

        const hash = await bcrypt.hash(password, salt);
       
        
        return hash;
    }catch(err){
       
        throw new BadRequest("خطا في تشفير كلمة المرور");
    }
}
export async function comparePassword(SubmittedPassword: string, OldHashPassword: string):Promise<boolean> {
    try{
        return await bcrypt.compare(SubmittedPassword, OldHashPassword);
    }catch(err){
        throw new BadRequest("خطا في مقارنة كلمة المرور");
    }
}
