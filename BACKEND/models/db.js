import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/CampusMart");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,  
    images: [String], 
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    status: {type: Boolean, default:true},
    createdAt: { type: Date, default: Date.now }
});



const userSchema = new mongoose.Schema({
    userName:String,
    // email:String,
    rollNumber:String,
    batch: String,
    password:String,
    profilePic:String,
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }], 
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }], 
    cart: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
    createdAt: { type: Date, default: Date.now }
})

export const Users = mongoose.model('Users',userSchema);
export const Listings = mongoose.model('Listings',listingSchema);

