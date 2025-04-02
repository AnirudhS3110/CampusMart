import { Router } from "express";
import { jwtAuthentication } from "../authentication/authent.js";
import { Listings, Users } from "../models/db.js";

 const router = Router()

router.get('/getListings',async(req,res)=>{
    try{
        const listings = await Listings.find({}).populate('seller','userName');
        res.json({success:true, listings:listings})
    }catch(e){
        res.json({success:false,message:"Error while fetching listing from db"});
    }

})

router.post('/setLike',async(req,res)=>{
    const {userID,listID} = req.body;
    try{
        const updatedUser = await Users.findByIdAndUpdate(userID,{$push:{favorites:listID}},{new:true})

        if(updatedUser)
        {
            return res.status(200).json({success:true});
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

