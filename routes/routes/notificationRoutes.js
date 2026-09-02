import {Router} from "express";import {list,read} from "../controllers/notificationController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.get("/",protect,list);r.put("/:id/read",protect,read);export default r;
