import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Property from "../models/Property.js";
export async function list(req,res){res.json(await Review.find({property:req.params.propertyId}).populate("user","name avatar").sort({createdAt:-1}));}
export async function create(req,res){
  const b=await Booking.findOne({tenant:req.user._id,property:req.body.propertyId,status:"successful"});
  if(!b)return res.status(403).json({message:"Only successful bookings can review"});
  const r=await Review.create({property:req.body.propertyId,user:req.user._id,rating:req.body.rating,comment:req.body.comment});
  const stats=await Review.aggregate([{$match:{property:r.property}},{$group:{_id:null,avg:{$avg:"$rating"},count:{$sum:1}}}]);
  await Property.findByIdAndUpdate(r.property,{ratingAvg:stats[0].avg,ratingCount:stats[0].count});
  res.status(201).json(r);
}
export async function remove(req,res){const r=await Review.findOneAndDelete({_id:req.params.id,user:req.user._id});if(!r)return res.status(404).json({message:"Review not found"});res.json({message:"Deleted"});}
