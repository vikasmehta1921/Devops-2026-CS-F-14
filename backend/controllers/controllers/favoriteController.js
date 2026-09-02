import Favorite from "../models/Favorite.js";
export async function add(req,res){
  try{res.status(201).json(await Favorite.create({user:req.user._id,property:req.body.propertyId}));}
  catch{res.status(409).json({message:"Already in wishlist"});}
}
export async function list(req,res){res.json(await Favorite.find({user:req.user._id}).populate("property"));}
export async function remove(req,res){await Favorite.findOneAndDelete({user:req.user._id,property:req.params.propertyId});res.json({message:"Removed"});}
