import mongoose from "mongoose";
const schema = new mongoose.Schema({
  reporter:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
  reason:{type:String,required:true},
  description:{type:String,default:""},
  status:{type:String,enum:["open","reviewed","resolved"],default:"open"}
},{timestamps:true});
export default mongoose.model("Report",schema);
