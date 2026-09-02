import mongoose from "mongoose";
const schema = new mongoose.Schema({
  tenant:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  property:{type:mongoose.Schema.Types.ObjectId,ref:"Property",required:true},
  owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  moveInDate:{type:Date,required:true},
  durationMonths:{type:Number,default:1},
  message:{type:String,default:""},
  status:{type:String,enum:["pending","successful","rejected","cancelled"],default:"pending"},
  bookingCode:{type:String,unique:true}
},{timestamps:true});
export default mongoose.model("Booking",schema);
