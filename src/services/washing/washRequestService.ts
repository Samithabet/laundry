import prisma from "../../conf/db";
import { BadRequest, InternalServerError } from "http-errors";
import { WashingStatus } from "../../enum/washingStatus";
class washRequestService {
  public async washReques(data: any): Promise<any> {
    try {
      const totalWash = await this.totalWithoutTax(data.wash);
      const totalWashWithTax = await this.totalIncludingTax(totalWash);
      const washing = await prisma.washing.create({
        data: {
          customerId: data.customerId,
          totalIncludingTax: totalWash,
          totalWithoutTax: totalWashWithTax,
          status: WashingStatus.PROCESSING,
        },
      });
      if(washing){
       const bill= await prisma.bills.create({
            data: {
              customerId: data.customerId,
              washingId:washing.id,
              total: totalWash,
            },
          });
       console.log("🚀 ~ washRequestService ~ washReques ~ bill:", bill)
       return bill
      }
     
   
    } catch (error) {
      if (error instanceof BadRequest) {
        throw error;
      }
      throw new InternalServerError("خطاء في الخادم");
    }
  }
  private async totalWithoutTax(
    arr: { clothesId: number; serviceTypeId: number; quantity: number }[]
  ): Promise<number> {
    let total = 0;

    for (let index = 0; index < arr.length; index++) {
      const service = await prisma.service.findFirst({
        where: {
          clothesId: arr[index].clothesId,
          serviceTypeId: arr[index].serviceTypeId,
        },
      });
      if (service) {
        total = total + service.cost * arr[index].quantity;
      }
    }
    return total;
  }
  private async totalIncludingTax(total: number): Promise<number> {
    
  
    const costTax = await prisma.tax.findFirst();
    if (!costTax) {
      throw new BadRequest("ايجب اظافة ضريبه في التهيئة النظام");
    }
    const Tax = costTax?.scot / 100;
    return total + Tax * 100;
    
 
  }
}
export default new washRequestService();
