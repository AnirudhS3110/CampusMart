import { Router } from "express";
import { jwtAuthentication } from '../authentication/authent.js';
import { Listings, Users } from '../models/db.js';
const router = Router();

router.post('/getDashboard', jwtAuthentication, async(req,res)=>{
    const rollNo = req.body.rollNumber;
    console.log("rollnumbner: ", rollNo);
    try{
        console.log("inside try block of getDahsboard")
        const user = await Users.findOne({rollNumber:rollNo}).populate({ path: 'favorites', model: 'Listings' });
        console.log("user object: ", user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userListing = await Listings.find({seller:user._id});
        console.log("userlisiting : ",userListing);
        const boughtListings = await Listings.find({buyer:user._id});
        return res.json({success:true,username:user.userName, likedListings:user.favorites, userListing:userListing, boughtListings:boughtListings});
    } 
    catch(e){
        return res.status(500).json({success:false, message:"Internal server error while sending liked list"});
    }
})

router.post('/viewListings', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.rollNumber;
    const user = await Users.findOne({rollNumber:rollNo});
    const userListing = await Listings.find({seller:user._id})
    return res.json({success:true,userListing:userListing});
})

router.get('/viewLiked',jwtAuthentication, async(res,req)=>{
    const rollNo = req.body.payload.rollNumber;
    try{
    const user = await Users.find({rollNumber:rollNo}).populate('favorites');
    return res.json({success:true, likedListings:user.favorites});
    }
    catch(e){
        return res.status(500).json({success:false, message:"Internal server error while sending liked list"});
    }
});

// router.get('/getuserListings', jwtAuthentication , async(req,res)=>{
//     const rollNo = req.body.rollNumber;

//     try{
//         const user = await Users.findOne({rollNumber:rollNo}).populate({ path: 'favorites', model: 'Listings' });
//     }
// })

export default router;

//NEED TO ADD REMOVE LIKED ITEM


