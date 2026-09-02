import User from "../models/User.js";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import Report from "../models/Report.js";
export async function dashboard(req,res){
  const [users,owners,properties,pendingBookings,reports]=await Promise.all([
    User.countDocuments(),User.countDocuments({role:"owner"}),Property.countDocuments(),Booking.countDocuments({status:"pending"}),Report.countDocuments({status:"open"})
  ]);
  res.json({users,owners,properties,pendingBookings,reports});
}
export async function properties(req,res){res.json(await Property.find().populate("owner","name email").sort({createdAt:-1}));}
export async function verifyProperty(req,res){res.json(await Property.findByIdAndUpdate(req.params.id,{verified:true},{new:true}));}
export async function users(req,res){res.json(await User.find().select("-password").sort({createdAt:-1}));}
export async function disableUser(req,res){res.json(await User.findByIdAndUpdate(req.params.id,{isActive:req.body.isActive},{new:true}).select("-password"));}
