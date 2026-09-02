import {Router} from "express";import multer from "multer";import fs from "fs";import {uploadImage} from "../controllers/uploadController.js";import {protect,authorize} from "../middleware/authMiddleware.js";
fs.mkdirSync("uploads",{recursive:true});
const upload=multer({dest:"uploads/",limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>cb(null,file.mimetype.startsWith("image/"))});
const r=Router();r.post("/image",protect,authorize("owner","admin"),upload.single("image"),uploadImage);export default r;
