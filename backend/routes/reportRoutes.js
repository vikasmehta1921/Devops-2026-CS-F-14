import {Router} from "express";import {create,list,update} from "../controllers/reportController.js";import {protect,authorize} from "../middleware/authMiddleware.js";
const r=Router();r.post("/",protect,create);r.get("/",protect,authorize("admin"),list);r.put("/:id",protect,authorize("admin"),update);export default r;
