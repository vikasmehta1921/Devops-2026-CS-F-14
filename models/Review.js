import mongoose from "mongoose";
const schema = new mongoose.Schema({
  property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  rating:{type:Number,min:1,max:5,required:true},
  comment:{type:String,default:""}
},{timestamps:true});
schema.index({property:1,user:1},{unique:true});
export default mongoose.model("Review",schema);
