const mongoose=require("mongoose")

const BidderSchema=new mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true

        },
        name:{
            type:String,
            required:true

        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        mobile:{
            type:String,
            required:true
        },
        proof:{
            type:String,
            required:true
        },
        taskList:[String],
        stars:{
            type:Number,
            default:5
        },
        pass:{
            type:String,
            required:true
        },
        noOfCompletion:{
            type:Number,
            default:0
        },
        skills:[String],
        taskCompleted:{
            type:[mongoose.Types.ObjectId],
            ref:"Task",
            default:[]
        },
        taskBidded:{
            type:[mongoose.Types.ObjectId],
            ref:"BidLog",
            default:[]
        },
        taskQueue:{
            type:[mongoose.Types.ObjectId],
            ref:"BidLog",
            default:[]
        },
        location: {
        type: { type: String, enum: ['Point'], required: true },  //  GeoJSON format
        coordinates: { type: [Number], required: true }
        },
        completeRequest:{
            type:[mongoose.Types.ObjectId],
            ref:"Task",
            default:[]
        }
        
    }
)
BidderSchema.index({ location: "2dsphere" });

BidderSchema.pre('save',async function(next){
    const bidder = this;
    if(bidder.isModified('pass')){
        const hashedPassword = await bcrypt.hash(bidder.pass, 10);
        bidder.pass = hashedPassword;
    }
})

const BidderModel=mongoose.model("Bidder",BidderSchema);
module.exports=BidderModel;