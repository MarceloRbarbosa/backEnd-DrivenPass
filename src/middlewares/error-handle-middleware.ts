import { Request, Response, NextFunction, request } from "express";
import  httpStatus  from "http-status";
import { CustomError } from "../protocols/protocolTypes";

export default function errorHandler(err: Error, req: Request, res: Response, next:NextFunction ){
    const error = err as CustomError;

    if(error.type === "NOT_FOUND") return res.status(httpStatus.NOT_FOUND).send(err.message);
    if (error.type === "conflict") return res.status(httpStatus.CONFLICT).send(err.message);
    if (error.type === "unprocessable_entity") return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);
    
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
}