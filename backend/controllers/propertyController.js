import Property from "../models/Property.js";
import Favorite from "../models/Favorite.js";
import History from "../models/History.js";
import User from "../models/User.js";

const pick = (body)=>({
 title:body.title,description:body.description,propertyType:body.propertyType,
 furnishing:body.furnishing,roomType:body.roomType,rent:Number(body.rent),
 deposit:Number(body.deposit||0),bedrooms:Number(body.bedrooms||1),bathrooms:Number(body.bathrooms||1),
 city:body.city,state:body.state,locality:body.locality,pincode:body.pincode,address:body.address,
 location:body.location,amenities:body.amenities||[],images:body.images||[],availableFrom:body.availableFrom
});

export async function list(req,res){
  const {city,state,locality,propertyType,furnishing,minRent,maxRent,bedrooms,amenities,sort="newest",page=1,limit=12}=req.query;
  const q={status:{$ne:"rented"}};
  if(city) q.city=new RegExp(city,"i");
  if(state) q.state=new RegExp(state,"i");
  if(locality) q.locality=new RegExp(locality,"i");
  if(propertyType) q.propertyType=propertyType;
  if(furnishing) q.furnishing=furnishing;
  if(minRent||maxRent){q.rent={}; if(minRent)q.rent.$gte=Number(minRent); if(maxRent)q.rent.$lte=Number(maxRent);}
  if(bedrooms) q.bedrooms={$gte:Number(bedrooms)};
  if(amenities) q.amenities={$all:Array.isArray(amenities)?amenities:amenities.split(",")};
  const sortMap={priceAsc:{rent:1},priceDesc:{rent:-1},rating:{ratingAvg:-1},popular:{views:-1},newest:{createdAt:-1}};
  const data=await Property.find(q).populate("owner","name phone email").sort(sortMap[sort]||sortMap.newest).skip((page-1)*limit).limit(Number(limit));
  const total=await Property.countDocuments(q);
  if(req.user && req.query.history) await History.create({user:req.user._id,type:"search",query:JSON.stringify(req.query)});
  res.json({data,total,page:Number(page),pages:Math.ceil(total/limit)});
}
export async function getById(req,res){
  const p=await Property.findById(req.params.id).populate("owner","name phone email");
  if(!p)return res.status(404).json({message:"Property not found"});
  p.views++; await p.save();
  if(req.user) await History.create({user:req.user._id,type:"view",property:p._id});
  res.json(p);
}
export async function mine(req,res){res.json(await Property.find({owner:req.user._id}).sort({createdAt:-1}));}
export async function create(req,res){res.status(201).json(await Property.create({...pick(req.body),owner:req.user._id}));}
export async function update(req,res){
  const p=await Property.findOne({_id:req.params.id,owner:req.user._id});
  if(!p)return res.status(404).json({message:"Property not found or not owned by you"});
  Object.assign(p,pick(req.body)); await p.save(); res.json(p);
}
export async function remove(req,res){
  const p=await Property.findOneAndDelete({_id:req.params.id,owner:req.user._id});
  if(!p)return res.status(404).json({message:"Property not found"});
  res.json({message:"Property deleted"});
}
export async function recommended(req,res){
  const user=await User.findById(req.user._id);
  const q={status:"available"};
  if(user.preferences?.city) q.city=new RegExp(user.preferences.city,"i");
  if(user.preferences?.propertyType) q.propertyType=user.preferences.propertyType;
  if(user.preferences?.furnishing) q.furnishing=user.preferences.furnishing;
  if(user.preferences?.minRent||user.preferences?.maxRent) q.rent={$gte:user.preferences.minRent||0,$lte:user.preferences.maxRent||Number.MAX_SAFE_INTEGER};
  const props=await Property.find(q).sort({ratingAvg:-1,views:-1}).limit(20);
  res.json(props);
}
