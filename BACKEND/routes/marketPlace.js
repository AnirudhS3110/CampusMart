import { Router } from "express";
import { jwtAuthentication } from "../authentication/authent.js";
import { Listings } from "../models/db.js";

 const router = Router()

router.get('/getListings',async(req,res)=>{
    try{
        const listings = await Listings.find({}).populate('seller','userName');
        res.json({success:true, listings:listings})
    }catch(e){
        res.json({success:false,message:"Error while fetching listing from db"});
    }

})

export default router;

