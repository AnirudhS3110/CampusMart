import { Router } from 'express';
import { jwtAuthentication } from '../authentication/authent.js';
import { Listings, Users } from '../models/db.js';
import mongoose from 'mongoose';

const router = Router();

router.post('/addItem',jwtAuthentication , async(req,res)=>{
    const {title,description,price,category,imageURL,rollNumber} = req.body;
    console.log(imageURL , `type of the url, ${typeof(imageURL)}`);
    const user = await Users.findOne({rollNumber:rollNumber});
    
    try{
        console.log("Came into try block of adddItem api")
        const newListing = await Listings.create({
            title:title, 
            description:description,
            price:price,
            category:category,
            image: imageURL,
            seller: user._id
        });
        if(!newListing)
            return res.status(500).json({success:false , message:"Internal server error in adding items in list"})
    
        await Users.findByIdAndUpdate(user._id,{$push:{listings:newListing._id}})
        return res.status(201).json({success:true, message:"List successfully added!"});
    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"Internal Server error from addItem"});
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