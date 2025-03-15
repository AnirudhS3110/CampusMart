import express from 'express';
import { Router } from 'express';
import { jwtAuthentication } from '../authentication/authent';
import { Listings, Users } from '../models/db';

const router = Router();

router.post('/addItem',jwtAuthentication , async(req,res)=>{
    const {title,description,price,imageURL,category} = req.body;
    const rollNo = req.body.payload.rollNumber;
    
    try{
        const user = await Users.findOne({rollNumber:rollNo})
        if(!user)
            return res.json({success:false, message:"User not found"});
        const newListing = await Listings.create({
            title:title, 
            description:description,
            price:price,
            category:category,
            images: [imageURL],
            seller: user._id
        });
        if(!newListing)
            return res.status(500).json({success:false , message:"Internal server error in adding items in list"})
    
        await Users.findByIdAndUpdate(user._id,{$push:{listings:newListing._id}})
        return res.status(201).json({success:true, message:"List successfully added!"});
    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"Internal Server error"});
    }
});


router.post('/removeItem',jwtAuthentication, async(req,res)=>{
    const itemID = req.body.itemID;
    if (!itemID) {
        return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    try{
        const deletedItem = await Listings.findByIdAndDelete(itemID);
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        return res.json({success:true,message:"Item deleted"});
    }
    catch(e){
        return res.status(500).json({success:false, message:"Internal Server error"})
    }
    
})

//To add favourites
router.post('/favouritesList', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.rollNumber;
    const id = req.body.id;
    try{
        const wishList = await Users.findOneAndUpdate({rollNumber:rollNo},{$push:{favourites:id}});
    return res.status(201).json({success:true, message:"Product successfully added to Favourites"});
    }
    catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error"});
    }
})



export default router;