import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

interface JwtPayload {
    id: number;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).send("Token not provided");
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err) {
      return res.status(httpStatus.UNAUTHORIZED).send("Token invalid or expired");
    }

    req.userId = (user as JwtPayload).id;
    next();
  });
}
