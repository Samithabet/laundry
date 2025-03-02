import { BadRequest, Conflict, InternalServerError } from "http-errors";
import prisma from "../../conf/db";
import { hashPassword } from "../../conf/generateToken";
class LaundryService {
    public async getAllLaundry(filterData: any) {
        try {
            const { page, pageSize } = filterData;
            delete filterData.page;
            delete filterData.pageSize;
      
            if (page && pageSize) {
              const skip = (+page - 1) * +pageSize;
              const take = +pageSize;
      
              const newlaundry = await prisma.laundry.findMany({
                where: filterData,
                take: +take,
                skip: +skip,
              });
      
              const total = await prisma.laundry.count({
                where: filterData,
              });
      
              return {
                info: newlaundry,
                total,
                page,
                pageSize,
              };
            }
      
            return await prisma.laundry.findMany({
              where: filterData,
            });
          } catch (error) {
            throw new InternalServerError("خطاء في الخادم");
          }


}
public async  createLaundry(userLogin:any, Data: any) {
    try {
    const{laundryName,...reData}=Data
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
            data: { ...reData, passWord: hashedPassword,roleId:1 },
          });
          const laundry = await prisma.laundry.create({
           data:{ ownerId:userRegister.id,name:laundryName
            }
          })
          return laundry
      } catch (error) {
        if (error instanceof Conflict) {
          throw new Conflict(error.message);
        } else {
          throw new InternalServerError("خطاء في الخادم")
        }
      }
  }
}

export default new LaundryService();