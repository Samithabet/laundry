import washRequestService from "../../services/washing/washRequestService";
import { Request,Response,NextFunction } from "express";
class WashRequestController{
    public async washReques(req:Request,res:Response,next:NextFunction){
       try {
        const data=req.body
        const washRequest= washRequestService.washReques(data)
        return washRequest
        
        
       } catch (error) {
        next(error)
       }

    }
}
export default new WashRequestController