import { Router } from "express";

const healthRouter = Router()
healthRouter.get("/health")

export default healthRouter;