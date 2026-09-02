import mongoose from "mongoose";
const schema = new mongoose.Schema({
  tenant:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
  message:{type:String,required:true},
  status:{type:String,enum:["pending","responded","closed"],default:"pending"},
  response:{type:String,default:""}
},{timestamps:true});
export default mongoose.model("Enquiry",schema);
