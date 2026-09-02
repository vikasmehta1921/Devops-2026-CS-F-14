import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {signToken} from "../utils/token.js";

export async function register(req,res){
  const {name,email,password,phone,role="tenant"}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:"Name, email and password are required"});
  if(!["tenant","owner"].includes(role)) return res.status(400).json({message:"Invalid role"});
  if(await User.findOne({email})) return res.status(409).json({message:"Email already registered"});
  const user=await User.create({name,email,phone,role,password:await bcrypt.hash(password,12)});
  res.status(201).json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token:signToken(user._id)});
}
export async function login(req,res){
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({message:"Invalid email or password"});
  if(!user.isActive) return res.status(403).json({message:"Account disabled"});
  res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token:signToken(user._id)});
}
export async function me(req,res){res.json(req.user);}
export async function changePassword(req,res){
  const {currentPassword,newPassword}=req.body;
  const user=await User.findById(req.user._id);
  if(!(await bcrypt.compare(currentPassword,user.password))) return res.status(400).json({message:"Current password is incorrect"});
  user.password=await bcrypt.hash(newPassword,12); await user.save();
  res.json({message:"Password changed"});
}
