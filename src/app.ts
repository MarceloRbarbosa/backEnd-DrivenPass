import express, {json} from "express";  
import dotenv from "dotenv";
import routers from "./routes/index-routers";
import errorHandler from "./middlewares/error-handle-middleware";

dotenv.config();

const app = express();

app.use(json());
app.use(routers);
app.use(errorHandler);

export default app;
