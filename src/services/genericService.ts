import{BadRequest,InternalServerError} from "http-errors";
type PaginatedResponse<T> = {
  info: T[];
  total: number;
  page: number;
  pageSize: number;
};
class GenericService<T> {
    private model: any; // Use 'any' or a more specific type if possible

    constructor(model: any) {
        this.model = model;
    }
    

    public async getAll(filterData: any): Promise<PaginatedResponse<T>|T[]> {
        // try {
            const { page, pageSize } = filterData;
            delete filterData.page;
            delete filterData.pageSize;
      
            if (page && pageSize) {
              const skip = (+page - 1) * +pageSize;
              const take = +pageSize;
      
              const newAll = await this.model.findMany({
                where: filterData,
                take: +take,
                skip: +skip,
              });
      
              const total = await this.model.count({
                where: filterData,
              });
      
              return {
                info: newAll,
                total,
                page,
                pageSize,
              };
            }
      
            return await this.model.findMany({
              where: filterData,
            });
        // } catch (error) {
            
        // }
        // return this.model.findMany();
    }

    public async getById(id: number): Promise<T | null> {
      try {
        const data = await this.model.findUnique({ where: { id } });
        if (!data) {
          throw new BadRequest("هذا العنصر غير موجود");
        }
        return data;
        
      } catch (error) {
        if (error instanceof BadRequest) {
          throw error;
        }else {
          throw new InternalServerError("خطاء في الخادم");
          
        }
        
      }
        
    }

    public async create(data: T): Promise<T> {

        try {
          const newData = await this.model.create({ data });
          return newData;
        } catch (error) {
          throw new InternalServerError("خطاء في الخادم");
          
        }
    }

    public async update(id: number, data: Partial<T>): Promise<T> {
        try {
          const isExistItem=await this.model.findUnique({where:{id:id}})
          if(!isExistItem){
            throw new BadRequest("هذا العنصر غير موجود");

          }
          const newData = await this.model.update({ where: { id }, data });
          return newData;
          
        } catch (error) {
          if(error instanceof BadRequest){
            throw error;
          
        }
        else {
          throw new InternalServerError("خطاء في الخادم");
          
        }
        }
    }

    public async delete(id: number): Promise<T|string> {
        try {
          const isExistItem=await this.model.findUnique({where:{id:id}})
          if(!isExistItem){
            throw new BadRequest("هذا العنصر غير موجود");

          }
         await this.model.update({ where: { id }, data: { isDeleted: true } });
          return "تم حذف العنصر بنجاح";

        } catch (error) {
          if(error instanceof BadRequest){
            throw error;
          
          
        }
        else{
          throw new InternalServerError("خطاء في الخادم")
        }
    }
  }
}

export default GenericService;