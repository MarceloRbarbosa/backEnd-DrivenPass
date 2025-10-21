import { Request, Response, NextFunction } from "express";
import httpstatus from "http-status";


export function validateParamId(paramName: string) {
    return (req: Request, res:Response, next: NextFunction) => {
        const value = Number(req.params[paramName]);
        if (isNaN(value) || value <= 0) {
            return res.status(httpstatus.BAD_REQUEST).send(`${paramName} must be a positive number`);
        }
        next();
    }
}