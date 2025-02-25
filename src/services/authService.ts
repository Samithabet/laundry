import { User } from "@prisma/client";
import { HttpError, Conflict,NotFound,BadRequest,InternalServerError } from "http-errors";
import { comparePassword, generateToken, hashPassword } from "../conf/generateToken";
import prisma from "../conf/db";
import e from "express";
 class AuthService {
  public async Register(user: User): Promise<User | undefined> {
    // Implement user registration logic
    try {
      const userEmail = await prisma.user.findFirst({
        where: { email: user.email },
      });
      if (userEmail) {
        throw new Conflict("البريد الالكتروني هذا موجود من قبل");
      }
      const userName = await prisma.user.findFirst({
        where: { userName: user.userName },
      });
      if (userName) {
        throw new Conflict("اسم المستخدم هذا موجود من قبل");
      }
      const hashedPassword = await hashPassword(user.passWord);

      return await prisma.user.create({
        data: { ...user, passWord: hashedPassword },
      });
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict(error.message);
      } else {
        throw new HttpError("خطاء في تسجيل المستخدم");
      }
    }
  }
  public async Login(userName: string, password: string): Promise<{ user: string; token: string }> {
    try {
      const user = await prisma.user.findFirst({ where: { userName: userName } });
      if (!user) {
        throw new NotFound("اسم المستخدم غير موجود");
      }
     
      
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword,"new");
      console.log(user.passWord,"old");
      
      
      const isPasswordMatch = await comparePassword(hashedPassword, user.passWord);
      if (!isPasswordMatch) {
        throw new BadRequest("كلمة المرور غير صحيحة");
      }
      const token = generateToken(user);
     const userWithToken = {
        user: user.userName,
        token: token,
      };
      return userWithToken;
 
    } catch (error) {
      if (error instanceof NotFound) {
        throw new NotFound(error.message);
      }else if (error instanceof BadRequest) {
        throw new BadRequest(error.message);
      }
       else {
        throw new InternalServerError("خطاء في تسجيل الدخول");
      }
    }
    
  }
}
export default new AuthService();