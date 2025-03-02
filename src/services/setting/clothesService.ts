import prisma from "../../conf/db";
import { InternalServerError } from "http-errors";

class ClothesService {
  public async getAllClothes(filterData: any) {
    try {
      const { page, pageSize } = filterData;
      delete filterData.page;
      delete filterData.pageSize;

      if (page && pageSize) {
        const skip = (+page - 1) * +pageSize;
        const take = +pageSize;

        const newclothes = await prisma.clothes.findMany({
          where: filterData,
          take: +take,
          skip: +skip,
        });

        const total = await prisma.clothes.count({
          where: filterData,
        });

        return {
          info: newclothes,
          total,
          page,
          pageSize,
        };
      }

      return await prisma.clothes.findMany({
        where: filterData,
      });
    } catch (error) {
      throw new InternalServerError("خطاء في الخادم");
    }
  }
  public async createClothes(data: any) {
    try {
      return await prisma.clothes.create({ data });
    } catch (error) {
      throw new InternalServerError("خطاء في الخادم");
    }
  }
}
