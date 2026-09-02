import mongoose from "mongoose";
const schema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  type:{type:String,enum:["search","view"],required:true},
  property:{type:mongoose.Schema.Types.ObjectId,ref:"Property"},
  query:{type:String}
},{timestamps:true});
export default mongoose.model("History",schema);
