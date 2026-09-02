import User from "../models/User.js";
export async function profile(req,res){res.json(req.user);}
export async function updateProfile(req,res){
  const allowed=["name","phone","avatar","preferences"];
  allowed.forEach(k=>{if(req.body[k]!==undefined) req.user[k]=req.body[k]});
  await req.user.save();
  res.json(req.user);
}
