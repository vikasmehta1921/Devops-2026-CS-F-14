import {Router} from "express"; import {profile,updateProfile} from "../controllers/userController.js"; import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.get("/profile",protect,profile);r.put("/profile",protect,updateProfile);export default r;
