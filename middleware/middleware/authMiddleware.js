import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req,res,next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({message:"Authentication required"});
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) return res.status(401).json({message:"Invalid or inactive account"});
    req.user = user;
    next();
  } catch {
    res.status(401).json({message:"Invalid or expired token"});
  }
}

export function authorize(...roles) {
  return (req,res,next) => {
    if (!req.user || !roles.includes(req.user.role))
      return res.status(403).json({message:"Access denied"});
    next();
  };
}
