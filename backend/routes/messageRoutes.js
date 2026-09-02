import {Router} from "express";import {send,conversation} from "../controllers/messageController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.post("/",protect,send);r.get("/:propertyId",protect,conversation);export default r;
