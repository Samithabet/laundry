import { User } from "@prisma/client";
import { HttpError, Conflict,NotFound,BadRequest,InternalServerError } from "http-errors";
import { comparePassword, generateToken, generateTokenForLaundry, hashPassword } from "../conf/generateToken";
import prisma from "../conf/db";
import { UserToken } from "../types/userToken";
 class AuthService {
  public async Register(userLogin:UserToken,Data:User): Promise<any | undefined> {
    // Implement user registration logic
    try {
      const user= await prisma.user.findFirst({
        where: { email: userLogin.email },include:{role:true}
      });
      if (!user) {
        throw new BadRequest("هذ المستخدم غير مو جود اعد تسجيل الدخول");
      }
        const userName = await prisma.user.findFirst({
          where: { userName: Data.userName },
        });
        console.log("🚀 ~ AuthService ~ Register ~ userName:", userName)
        if (userName) {
          throw new Conflict("اسم المستخدم هذا موجود من قبل");
        }
        const hashedPassword = await hashPassword(Data.passWord);
        const userRegister = await prisma.user.create({
          data: { ...Data, passWord: hashedPassword, },
        });
        const { passWord, ...userWithoutPassword } = userRegister;
        return{
          ...userWithoutPassword
        };
        
 
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict(error.message);
      } else {
        throw new HttpError("خطاء في تسجيل المستخدم");
      }
    }
  }
  public async RegisterLaundry(id:number): Promise<any | undefined> {
    // Implement user registration logic
    try {
      const laundry= await prisma.laundry.findFirst({
        where: { id: id },
      });
      if (!laundry) {
        throw new BadRequest("هذي المغسلة غير موجوده");
      }
     
    const laundryToken=generateTokenForLaundry(laundry);
    return{
      laundryToken
    }
        
 
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
      console.log("🚀 ~ AuthService ~ Login ~ user:", user)
     
      const isPasswordMatch = await comparePassword(password, user.passWord);
      console.log("🚀 ~ AuthService ~ Login ~ isPasswordMatch:", isPasswordMatch)
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