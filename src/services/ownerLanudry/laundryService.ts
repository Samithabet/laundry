import {
  BadRequest,
  Conflict,
  InternalServerError,
  NotFound,
} from "http-errors";
import prisma from "../../conf/db";
import { hashPassword } from "../../conf/generateToken";
import { Laundry } from "@prisma/client";
class LaundryService {
  public async createLaundry(userLogin: any, Data: any):Promise<Laundry> {
    try {
      const { laundryName, ...reData } = Data;
      const user = await prisma.user.findFirst({
        where: { email: userLogin.email },
        include: { role: true },
      });
      if (!user) {
        throw new BadRequest("هذ المستخدم غير مو جود اعد تسجيل الدخول");
      }

      const userName = await prisma.user.findFirst({
        where: { userName: Data.userName },
      });
      console.log("🚀 ~ AuthService ~ Register ~ userName:", userName);
      if (userName) {
        throw new Conflict("اسم المستخدم هذا موجود من قبل");
      }
      const hashedPassword = await hashPassword(Data.passWord);
      const userRegister = await prisma.user.create({
        data: { ...reData, passWord: hashedPassword, roleId: 1 },
      });
      const laundry = await prisma.laundry.create({
        data: { ownerId: userRegister.id, name: laundryName },
      });
      await prisma.user.update({
        where: { id: userRegister.id },
        data: { laundryId: laundry.id },
      })
      return laundry;
    } catch (error) {
      if (error instanceof Conflict) {
        throw new Conflict(error.message);
      } else {
        throw new InternalServerError("خطاء في الخادم");
      }
    }
  }
 
}

export default new LaundryService();
