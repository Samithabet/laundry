import e from "express";
import prisma from "../conf/db";
import { RoleName } from "../enum/role";
import{InternalServerError,NotFound} from "http-errors"
import { hashPassword } from "../conf/generateToken";
class SeedService{
    public async SeedRoleAndUsperAdmin(){
        // Implement seed data logic
     try {
        const roleName=Object.values(RoleName);
        
        for(const name of roleName){
            await prisma.role.create({data:{name}});
        }
        console.log("role created successfully");
        const role=await prisma.role.findFirst({where:{name:RoleName.USPER_ADMIN}});
        if(!role) throw new NotFound("role not found");
        const hashedPassword= await hashPassword("123456789");
        await prisma.user.create({data:{email:"sami.th17516@gmail.com",userName:"SamiAlnhdi",passWord:hashedPassword,name:"Sami Thabet",phoen:"715164053",address:"cairo",roleId:role.id}});
        console.log("user created successfully");
        
     } catch (error) {
        if(error instanceof NotFound){
            throw new NotFound(error.message);
        }else{
            throw new InternalServerError("something went wrong");
        }
        
     }
   
        
        

    }
}
export default new SeedService();