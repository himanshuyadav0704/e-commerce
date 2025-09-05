const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
main()
.then(() => {
    console.log("connected to DB h");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req,res) => {
    res.send("hi, mai root hu");
});

const validatListing = (req, res, next) => {
   let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",")
    throw new ExpressError(400, errMsg);
  }else {
    next();
  }   
}



// index route
app.get("/listings",wrapAsync( async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
}));

// *** NEW ROUTE ***
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
});

// show route
app.get("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/show.ejs", { listing });
}));

// Create Route
// app.post("/listings", (req, res)=> {
//     let listing = req.body;
//     console.log(listing);
    
// });


// Create Route
app.post("/listings",validatListing, wrapAsync( async (req, res,next) => {

        const newListing = new Listing(req.body.listing); 
       
        await newListing.save();
        console.log("New Listing Saved:", newListing);
        res.redirect("/listings"); // redirect back to index page
    
}));




//  edit route
app.get("/listings/:id/edit",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id); 
    res.render("listings/edit.ejs", {listing});
}));



// update route
app.put("/listings/:id", validatListing ,wrapAsync( async(req, res) => 
    {
    if(!req.body.listing) {
        throw new ExpressError(400, "send valid data for listing");
    }
     let { id } = req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));



// DELETE route
app.delete("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});



app.use((err, req, res, next) => {
    let {statusCode=500, message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message})
    // res.send("something went wrong");
    // res.status(statusCode).send(message);
})



app.listen(8080, () => {
    console.log("server is listening to the port 8080");
});