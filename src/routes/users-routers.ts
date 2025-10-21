import userController from "../controllers/user-controller";
import { validateSchema } from "../middlewares/validate-schema-middleare";
import { Router } from "express";
import userSchema from "schemas/user-schema";

const userRouter = Router();
userRouter.post("/sign-up", validateSchema(userSchema), userController.signUp);
userRouter.post("/sign-in", validateSchema(userSchema), userController.signIn);


export default userRouter;