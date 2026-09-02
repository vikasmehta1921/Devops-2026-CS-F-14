import dotenv from "dotenv";dotenv.config();
import connectDB from "../config/db.js";import User from "../models/User.js";import bcrypt from "bcryptjs";
await connectDB();
const email=process.env.ADMIN_EMAIL||"admin@example.com",password=process.env.ADMIN_PASSWORD||"Admin@12345";
const exists=await User.findOne({email});
if(!exists) await User.create({name:"System Admin",email,password:await bcrypt.hash(password,12),role:"admin"});
console.log(`Admin ready: ${email}`);process.exit();
