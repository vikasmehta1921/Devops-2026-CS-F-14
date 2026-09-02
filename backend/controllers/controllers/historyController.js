import History from "../models/History.js";
export async function list(req,res){res.json(await History.find({user:req.user._id}).populate("property","title city rent images").sort({createdAt:-1}));}
export async function addView(req,res){res.status(201).json(await History.create({user:req.user._id,type:"view",property:req.body.propertyId}));}
export async function clear(req,res){await History.deleteMany({user:req.user._id});res.json({message:"History cleared"});}
