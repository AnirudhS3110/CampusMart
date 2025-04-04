import { Router } from "express";
import { jwtAuthentication } from "../authentication/authent.js";
import { Listings, Users } from "../models/db.js";

 const router = Router()


router.post('/getMarketPlace',async(req,res)=>{
    const {userID} = req.body;
    try{
        const listings = await Listings.find({}).populate('seller','userName');
        const user = await Users.findById(userID).populate('favorites','_id');
        if(listings&& user)
        {
            res.json({success:true, listings:listings , likedList:user.favorites})
        }
        else{
            res.status(500).json({success:false,"message":"Error while fetching MarketPlace details form db"})
        }
    }catch(e){
        res.json({success:false,message:"Internal server error while fetching marketPlace from db"});
    }

})

router.post('/setLike',async(req,res)=>{
    const userID = req.body.userID;
    const listID = req.body.listID;
   
    try{
        const updatedUser = await Users.findByIdAndUpdate(userID,{$addToSet:{favorites:listID}},{new:true})
        console.log(updatedUser);

        if(updatedUser.favorites)
        {
            return res.status(200).json({success:true,favorites:updatedUser.favorites});
        }
        else{
            return res.status(500).json({success:false, message:"Error while addig to favourites"});
        }


    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"Internal server error while adding favourite to the user"});
    }
})

router.post('/removeLike',async(req,res)=>{
    const userID = req.body.userID;
    const listID = req.body.listID;
   
    try{
        const updatedUser = await Users.findByIdAndUpdate(userID,{$pull:{favorites:listID}},{new:true})
        console.log(updatedUser);

        if(updatedUser.favorites)
        {
            return res.status(200).json({success:true,favorites:updatedUser.favorites});
        }
        else{
            return res.status(500).json({success:false, message:"Error while addig to favourites"});
        }


    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"Internal server error while adding favourite to the user"});
    }
})

export default router;

