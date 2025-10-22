import { Request, Response } from "express";
import usersServices from "../services/users.services";
import httpStatus from "http-status";


async function signUp(req: Request, res: Response) {
const newUser = req.body;
await usersServices.createNewUser(newUser);
res.status(httpStatus.CREATED).send("User created successfully");
}

async function signIn(req: Request, res: Response) {
    const logginEmail = req.body.email
    const logginPassword = req.body.password;

    const token = await usersServices.findUsers(logginEmail, logginPassword);
    res.status(httpStatus.OK).json({  token  });
}

async function deleteUser(req: Request, res: Response) {
    const userId = (req as any).userId
    await usersServices.deleteUser(userId);
    res.status(httpStatus.OK).send("User deleted successfully");
    
}


const userController = {
    signUp,
    signIn,
    deleteUser
}

export default userController