import { User } from "@prisma/client";
import { HttpError, Conflict,NotFound,BadRequest,InternalServerError } from "http-errors";
import { comparePassword, generateToken, hashPassword } from "../../conf/generateToken";
import prisma from "../../conf/db";
import { UserToken } from "../../types/userToken";
import convertTopLevelStringBooleans from "../../utility/convertTopLevelStringBooleans";
import { RoleName } from "../../enum/role";
 class AuthService {

  public async Login(userName: string, password: string): Promise<{ user: string; token: string }> {
    try {
      const user = await prisma.user.findFirst({ where: { userName: userName,isDeleted:false } });
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
  public async getAllEmployees(userForLogin:User,filterData: any) {
    console.log("🚀 ~ AuthService ~ getAllEmployees ~ userForLogin:", userForLogin)
    try {
const role=await prisma.role.findUnique({where:{id:userForLogin.roleId}});
if(!role) throw new NotFound("يجب عليك تسجيل الدخول");
if(role.name===RoleName.ADMIN){
  

      const { page, pageSize } = filterData;
      let { include } = filterData;
      delete filterData.page;
      delete filterData.pageSize;
      delete filterData.include;
      if (include) {
         include = convertTopLevelStringBooleans(include)
      } else {
        include = {}
      }

      if (page && pageSize) {
        const skip = (+page - 1) * +pageSize;
        const take = +pageSize;

        const userAll = await prisma.laundry.findMany({
          where: {...filterData,ownerId:userForLogin.id},
          take: +take,
          skip: +skip,
         select:{
          id:true,
          name:true,
          User:{
            select: {
              userName: true,
              email: true,
              phoen: true,
            },
          }
         }
        });

        const total = await prisma.laundry.count({
          where: {...filterData,ownerId:userForLogin.id},
        });
        return {
          info: userAll,
          total,
          page,
          pageSize,
        };
      }

      return await prisma.laundry.findMany({
        where: {...filterData,ownerId:userForLogin.id},
       select:{
        id:true,
        name:true,
        User:{
          select: {
            userName: true,
            email: true,
            phoen: true,
          },
        }
       }
      });
    }else{
      const { page, pageSize } = filterData;
      let { include } = filterData;
      delete filterData.page;
      delete filterData.pageSize;
      delete filterData.include;
      if (include) {
         include = convertTopLevelStringBooleans(include)
      } else {
        include = {}
      }

      if (page && pageSize) {
        const skip = (+page - 1) * +pageSize;
        const take = +pageSize;

        const userAll = await prisma.user.findMany({
          where: {...filterData,ownerId:userForLogin.id},
          take: +take,
          skip: +skip,
          select:{
            id:true,
            userName:true,
            email:true,
            phoen:true,
            address:true,
            role:{
              select: {
                name: true,
              }
            },
            laundry:{
              select: {
                name: true,
              },
            }
           
            }
        });

        const total = await prisma.user.count({
          where:filterData,
        });
        return {
          info: userAll,
          total,
          page,
          pageSize,
        };
      }

      return await prisma.user.findMany({
        where: filterData,
       select:{
       id:true,
       userName:true,
       email:true,
       phoen:true,
       address:true,
       role:{
         select: {
           name: true,
         }
       },
       laundry:{
         select: {
           name: true,
         },
       }

      
       }
      });
    }
    }
   catch (error) {
    throw new InternalServerError("خطاء في الخادم");
      
  }
}
}
export default new AuthService();