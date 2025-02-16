
import express, {Application} from "express"
import { ErrorMiddleware } from "./middlewares/erorrMiddleware";
import  rootRouter  from "./routes/index";
import cors from "cors"
import  CorsOptions  from "./conf/crosOption";
class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.errorMiddleware();
        // this.routes();
    }
    private middleware() {
        this.app.use(express.json());
        this.app.use(cors(CorsOptions))
        this.app.use(express.urlencoded({ extended: false }));
    }
    private errorMiddleware() {
        this.app.use(ErrorMiddleware);
    }
    // private routes() {  
    //     this.app.use('/api',rootRouter)
    // }
}
export default new App();