import mongoose from "mongoose";
const schema = new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  title:{type:String,required:true,trim:true},
  description:{type:String,required:true},
  propertyType:{type:String,enum:["flat","apartment","pg","hostel","room","house"],required:true},
  furnishing:{type:String,enum:["furnished","semi-furnished","unfurnished"],required:true},
  roomType:{type:String,default:"single"},
  rent:{type:Number,required:true,min:0},
  deposit:{type:Number,default:0},
  bedrooms:{type:Number,default:1},
  bathrooms:{type:Number,default:1},
  city:{type:String,required:true,index:true},
  state:{type:String,required:true},
  locality:{type:String,default:""},
  pincode:{type:String,default:""},
  address:{type:String,default:""},
  location:{lat:Number,lng:Number},
  amenities:[String],
  images:[String],
  availableFrom:{type:Date},
  status:{type:String,enum:["available","pending","rented"],default:"available"},
  views:{type:Number,default:0},
  verified:{type:Boolean,default:false},
  ratingAvg:{type:Number,default:0},
  ratingCount:{type:Number,default:0}
},{timestamps:true});
schema.index({city:"text",state:"text",locality:"text",title:"text",description:"text"});
export default mongoose.model("Property",schema);
