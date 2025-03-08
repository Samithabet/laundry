import washRequestService from "../../services/washing/washRequestService";
import { Request,Response,NextFunction } from "express";
class WashRequestController{
    public async washReques(req:Request,res:Response,next:NextFunction){
       try {
        const data=req.body
        const washRequest=await washRequestService.washReques(data)
        console.log("🚀 ~ WashRequestController ~ washReques ~ washRequest:", washRequest)
        res.status(200).json(washRequest);
        
        
       } catch (error) {
        console.log("rffffff",error);
        
        next(error)
       }

    }
}
export default new WashRequestController