import express, {json} from "express";  
import chalk from "chalk";
import dotenv from "dotenv";
import routers from "./routes/index-routers";
import errorHandler from "./middlewares/error-handler";

dotenv.config();

const app = express();

app.use(json());
app.use(routers);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(chalk.yellow(`Servidor está rodando na porta` + chalk.cyan(`:${process.env.PORT}`) ));
});
