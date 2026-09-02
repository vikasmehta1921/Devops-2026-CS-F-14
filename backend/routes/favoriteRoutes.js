import {Router} from "express";import {add,list,remove} from "../controllers/favoriteController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.post("/",protect,add);r.get("/",protect,list);r.delete("/:propertyId",protect,remove);export default r;
