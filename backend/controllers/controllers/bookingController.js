import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
import {notify} from "../utils/notifications.js";
function code(){return "BK-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();}
export async function create(req,res){
  const {propertyId,moveInDate,durationMonths,message}=req.body;
  const p=await Property.findById(propertyId).populate("owner","name");
  if(!p || p.status==="rented") return res.status(400).json({message:"Property is unavailable"});
  const b=await Booking.create({tenant:req.user._id,property:p._id,owner:p.owner._id,moveInDate,durationMonths,message,bookingCode:code()});
  await notify(p.owner._id,"New booking request",`${req.user.name} requested ${p.title}`,"booking");
  res.status(201).json(b);
}
export async function list(req,res){
  const q=req.user.role==="owner"?{owner:req.user._id}:{tenant:req.user._id};
  res.json(await Booking.find(q).populate("property","title rent city images").populate("tenant","name phone email").populate("owner","name phone email").sort({createdAt:-1}));
}
export async function update(req,res){
  const b=await Booking.findById(req.params.id).populate("property");
  if(!b)return res.status(404).json({message:"Booking not found"});
  if(req.user.role==="owner" && String(b.owner)!==String(req.user._id)) return res.status(403).json({message:"Not your booking"});
  const status=req.body.status;
  if(!["pending","successful","rejected","cancelled"].includes(status)) return res.status(400).json({message:"Invalid status"});
  b.status=status; await b.save();
  if(status==="successful"){b.property.status="pending";await b.property.save();}
  await notify(b.tenant._id,"Booking updated",`Your booking is now ${status}`,"booking");
  res.json(b);
}
