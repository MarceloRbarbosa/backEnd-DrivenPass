import { Request , Response } from "express";
import  httpStatus  from "http-status";

export async function healthCheck(req: Request, res: Response) {
    res.status(httpStatus.OK).send(" I'm OK!");
}