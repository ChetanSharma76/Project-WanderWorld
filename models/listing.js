const mongoose=require('mongoose');
const Review = require('./review');
const Schema=mongoose.Schema;


//listing the schema i.e the structure of the collection
const listingSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews :[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:
    {
        type: Schema.Types.ObjectId,
        ref:'User',
    },
});

listingSchema.post('findOneAndDelete',async(listing)=>{

    if(listing){
        await Review.deleteMany({
            _id:{$in:listing.reviews}
        });
    }
});

const Listing=mongoose.model('Listing',listingSchema);
module.exports=Listing;