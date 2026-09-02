import fs from "fs";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
export async function uploadImage(req,res){
  if(!req.file)return res.status(400).json({message:"image field is required"});
  const hasCloud=process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;
  if(hasCloud){
    cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET});
    const result=await cloudinary.uploader.upload(req.file.path,{folder:"smart-rental"});
    fs.unlinkSync(req.file.path);
    return res.json({url:result.secure_url});
  }
  res.json({url:`/uploads/${req.file.filename}`});
}
