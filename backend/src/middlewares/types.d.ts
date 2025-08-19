import { Request, Response, NextFunction } from "express";

export interface expressTypes {
  (req: Request, res: Response, next: NextFunction): void;
}
