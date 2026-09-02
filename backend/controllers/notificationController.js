import Notification from "../models/Notification.js";
export async function list(req,res){res.json(await Notification.find({user:req.user._id}).sort({createdAt:-1}));}
export async function read(req,res){const n=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user._id},{read:true},{new:true});res.json(n);}
