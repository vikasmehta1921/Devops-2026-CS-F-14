import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  phone:{type:String,trim:true},
  password:{type:String,required:true},
  role:{type:String,enum:["tenant","owner","admin"],default:"tenant"},
  avatar:{type:String,default:""},
  preferences:{
    city:String, propertyType:String, furnishing:String,
    minRent:Number, maxRent:Number, amenities:[String]
  },
  isActive:{type:Boolean,default:true}
},{timestamps:true});
export default mongoose.model("User",schema);
