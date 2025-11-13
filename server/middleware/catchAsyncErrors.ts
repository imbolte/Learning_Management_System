import { NextFunction, Request, Response } from "express";

// Do not import Promise from mongoose!

export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };