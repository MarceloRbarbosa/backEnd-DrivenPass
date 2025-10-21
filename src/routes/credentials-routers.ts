import { Router } from "express";
import credentialsController from "../controllers/credentials-controller";
import { validateSchema } from "../middlewares/validate-schema-middleare";
import  credentialsSchema from "../schemas/credentials-schema";



const credentialsRouter = Router();

credentialsRouter.post("/credentials", validateSchema(credentialsSchema), credentialsController.createCredentials);
credentialsRouter.get("/credentials", credentialsController.getCredentials);
credentialsRouter.put("/credentials/:id", validateSchema(credentialsSchema), credentialsController.updateCredential);


export default credentialsRouter