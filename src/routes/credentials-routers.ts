import { Router } from "express";
import credentialsController from "../controllers/credentials-controller";
import { validateSchema } from "../middlewares/validate-schema-middleare";
import  credentialsSchema from "../schemas/credentials-schema";
import { validateParamId } from "../middlewares/paramsValue-validate-middleware";
import { authenticateToken } from "middlewares/token-middleware";



const credentialsRouter = Router();

credentialsRouter.post("/credentials",authenticateToken, validateSchema(credentialsSchema), credentialsController.createCredentials);
credentialsRouter.get("/credentials",authenticateToken, credentialsController.getCredentials);
credentialsRouter.put("/credentials/:id",authenticateToken,validateParamId("id"), validateSchema(credentialsSchema), credentialsController.updateCredential);
credentialsRouter.delete("/credentials/:id",authenticateToken,validateParamId("id"), credentialsController.deleteCredential);

export default credentialsRouter