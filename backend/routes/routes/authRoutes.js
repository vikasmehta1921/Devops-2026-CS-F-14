import {Router} from "express";
import {register,login,me,changePassword} from "../controllers/authController.js";
import {protect} from "../middleware/authMiddleware.js";
const r=Router(); r.post("/register",register);r.post("/login",login);r.get("/me",protect,me);r.put("/change-password",protect,changePassword);export default r;
