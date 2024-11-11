import { Request, Response, NextFunction } from "express";
import { adminAccessMiddleware } from "../middlewares/access-middleware";

export const taskMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.body.deadline || req.body.assigne) {
      adminAccessMiddleware(req, res, next);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
