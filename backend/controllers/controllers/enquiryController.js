import Enquiry from "../models/Enquiry.js";
import Property from "../models/Property.js";
import {notify} from "../utils/notifications.js";
export async function create(req,res){
  const p=await Property.findById(req.body.propertyId);
  if(!p)return res.status(404).json({message:"Property not found"});
  const e=await Enquiry.create({tenant:req.user._id,property:p._id,message:req.body.message});
  await notify(p.owner,"New enquiry",`New enquiry for ${p.title}`,"enquiry");
  res.status(201).json(e);
}
export async function list(req,res){
  const q=req.user.role==="owner"?{property:{$in:await Property.find({owner:req.user._id}).distinct("_id")}}:{tenant:req.user._id};
  res.json(await Enquiry.find(q).populate("tenant","name phone email").populate("property","title city"));
}
export async function update(req,res){
  const e=await Enquiry.findById(req.params.id);
  if(!e)return res.status(404).json({message:"Enquiry not found"});
  e.status=req.body.status||e.status;e.response=req.body.response??e.response;await e.save();
  await notify(e.tenant,"Enquiry update",e.response||"Your enquiry was updated","enquiry");
  res.json(e);
}
