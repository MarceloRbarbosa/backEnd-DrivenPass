import { Router } from "express";
import healthRouter from "./health-routers";
import userRouters from "./users-routers";
import credentialsRouters from "./credentials-routers";


const routers = Router();

routers.use(healthRouter)
routers.use(userRouters)    
routers.use(credentialsRouters)


export default routers