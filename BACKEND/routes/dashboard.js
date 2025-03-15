import { Router } from "express";
import { jwtAuthentication } from '../authentication/authent';
import { Listings, Users } from '../models/db';
const router = Router();

router.get('/getDashboard', jwtAuthentication, async(req,res)=>{
    const rollNo = req.body.payload.rollNumber;
    try{
        const user = await Users.findOne({rollNumber:rollNo}).populate('favourites');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userListing = await Listings.find({seller:user._id});
        const boughtListings = await Listings.find({buyer:user._id});
        return res.json({success:true,username:user.userName, likedListings:user.favorites, userListing:userListing, boughtListings:boughtListings});
    } 
    catch(e){
        return res.status(500).json({success:false, message:"Internal server error while sending liked list"});
    }
})

router.get('/viewListings', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.payload.rollNumber;
    const user = await Users.findOne({rollNumber:rollNo});
    const userListing = await Listings.find({seller:user._id})
    return res.json({success:true,userListing:userListing});
})

router.get('/viewLiked',jwtAuthentication, async(res,req)=>{
    const rollNo = req.body.payload.rollNumber;
    try{
    const user = await Users.find({rollNumber:rollNo}).populate('favourites');
    return res.json({success:true, likedListings:user.favorites});
    }
    catch(e){
        return res.status(500).json({success:false, message:"Internal server error while sending liked list"});
    }
});

//NEED TO ADD REMOVE LIKED ITEM


