import {Router} from "express";import {create,list,update} from "../controllers/enquiryController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.post("/",protect,create);r.get("/",protect,list);r.put("/:id",protect,update);export default r;
