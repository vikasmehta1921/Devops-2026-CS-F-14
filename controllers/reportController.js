import Report from "../models/Report.js";
import Property from "../models/Property.js";
export async function create(req,res){const p=await Property.findById(req.body.propertyId);if(!p)return res.status(404).json({message:"Property not found"});res.status(201).json(await Report.create({reporter:req.user._id,property:p._id,reason:req.body.reason,description:req.body.description}));}
export async function list(req,res){res.json(await Report.find().populate("property","title").populate("reporter","name email").sort({createdAt:-1}));}
export async function update(req,res){res.json(await Report.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true}));}
