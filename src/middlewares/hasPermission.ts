
import { Request, Response, NextFunction } from 'express';
import prisma from '../conf/db';
import { Forbidden } from 'http-errors';
export const hasPermission = (arr: any,) => {
    return async (req: Request, res: Response, next: NextFunction) => {
    try {
       
            const user = await prisma.user.findUnique({where:{email:req.user.email},include:{role:true}});
          if (arr.includes(user?.role?.name)) {
            next();
          } else {
           throw new Forbidden(`${req.originalUrl  } ليس لديمك صلاحية الوصول ل`);
          }
        
        
    } catch (error) {
        if(error instanceof Forbidden){
            next(error);
        }
        
    }
}
    
   
}


