import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jsonError } from "../utils";

type TokenDataType = {
  userId: string;
  username: string;
};

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-authorization-token"] as string;
  if (!token || token === "undefined")
    return jsonError(res, 403, "Please login and try again");

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (payload && (<TokenDataType>payload).userId === req.query.userId) {
      next();
    }
  } catch (error) {
    return jsonError(res, 401, "Unauthorized, try again");
  }
}
