 
import chalk from "chalk";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();



app.listen(process.env.PORT, () => {
    console.log(chalk.yellow(`Servidor está rodando na porta` + chalk.cyan(`:${process.env.PORT}`) ));
});