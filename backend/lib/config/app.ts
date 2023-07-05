import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { CurrencyRoutes } from "../routes/currency_routes";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://0.0.0.0:27017/' + environment.getDBName();

   private currency_routes: CurrencyRoutes = new CurrencyRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.currency_routes.route(this.app);
   }

   private config(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(cors());
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}
export default new App().app;