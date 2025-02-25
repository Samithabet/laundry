import express, { Application } from "express";
import { ErrorMiddleware, errorUrl } from "./middlewares/erorrMiddleware";
import rootRouter from "./routes/index";
import cors from "cors";
import CorsOptions from "./conf/crosOption";
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.errorForUrl();
    this.errorMiddleware();
  }
  private middleware() {
    this.app.use(express.json());
    this.app.use(cors(CorsOptions));
    this.app.use(express.urlencoded({ extended: false }));
  }

  private errorForUrl() {
    this.app.all("*", errorUrl);
   
  }
  private routes() {
    this.app.use("/api", rootRouter);
  }
  private errorMiddleware() {
    this.app.use(ErrorMiddleware);
  }
}
export default new App();
