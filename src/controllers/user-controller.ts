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


const userController = {
    signUp,
    signIn
}

export default userController