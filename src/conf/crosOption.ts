import { CorsOptions } from "cors"

const crosOption:CorsOptions={
    origin:'*',
    methods:['GET','HEAD','PUT','PATCH','POST','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
}
export default crosOption