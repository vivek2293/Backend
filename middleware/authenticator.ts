import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwtAuthenticator = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing Authorization Header" });
  }
  console.log(authHeader)
  const token = authHeader;
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized: Token has expired" });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Forbidden: Invalid Token" });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
    
    next();
  });
};