import userController from "../controllers/user-controller";
import { validateSchema } from "../middlewares/validate-schema-middleare";
import { Router } from "express";
import  { signUpSchema, signInSchema }  from "../schemas/user-schema";
import { authenticateToken } from "../middlewares/token-middleware";


const userRouter = Router();
userRouter.post("/sign-up", validateSchema(signUpSchema), userController.signUp);
userRouter.post("/sign-in", validateSchema(signInSchema), userController.signIn);
userRouter.delete("/erase",authenticateToken, userController.deleteUser); 



export default userRouter;