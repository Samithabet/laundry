import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BadRequest } from "http-errors";


dotenv.config();

export const generateToken = (user:any) => jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: "1d" });
export async function hashPassword(password: string):Promise<string> {
    try{
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }catch(err){
       
        throw new BadRequest("Error hashing password");
    }
}
export async function comparePassword(SubmittedPassword: string, OldHashPassword: string):Promise<boolean> {
    try{
        return await bcrypt.compare(SubmittedPassword, OldHashPassword);
    }catch(err){
        throw new BadRequest("Error comparing password");
    }
}