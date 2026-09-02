import {Router} from "express";import {list,addView,clear} from "../controllers/historyController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.get("/",protect,list);r.post("/view",protect,addView);r.delete("/",protect,clear);export default r;
