const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
          type : String,
          require : true
    },
    
    description : String,

    image : {    
        filename: String,
         url: String

    },

    // price : Number,
    price: {
  type: Number,
  default: 0
},
    location : String,
    country : String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;