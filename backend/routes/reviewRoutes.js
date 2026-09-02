import {Router} from "express";import {list,create,remove} from "../controllers/reviewController.js";import {protect} from "../middleware/authMiddleware.js";
const r=Router();r.get("/property/:propertyId",list);r.post("/",protect,create);r.delete("/:id",protect,remove);export default r;
