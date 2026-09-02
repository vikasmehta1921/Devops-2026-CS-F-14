import Message from "../models/Message.js";
import Booking from "../models/Booking.js";
export async function send(req,res){
  const b=await Booking.findOne({$or:[{tenant:req.user._id},{owner:req.user._id}],property:req.body.propertyId,status:"successful"});
  if(!b)return res.status(403).json({message:"Messaging is available after booking confirmation"});
  const receiver=String(b.tenant)===String(req.user._id)?b.owner:b.tenant;
  res.status(201).json(await Message.create({sender:req.user._id,receiver,property:req.body.propertyId,text:req.body.text}));
}
export async function conversation(req,res){
  res.json(await Message.find({property:req.params.propertyId,$or:[{sender:req.user._id},{receiver:req.user._id}]}).populate("sender","name").sort({createdAt:1}));
}
