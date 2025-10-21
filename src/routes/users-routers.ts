import userController from "../controllers/user-controller";
import { validateSchema } from "../middlewares/validate-schema-middleare";
import { Router } from "express";
import  { signUpSchema, signInSchema }  from "../schemas/user-schema";

const userRouter = Router();
userRouter.post("/sign-up", validateSchema(signUpSchema), userController.signUp);
userRouter.post("/sign-in", validateSchema(signInSchema), userController.signIn);



export default userRouter;