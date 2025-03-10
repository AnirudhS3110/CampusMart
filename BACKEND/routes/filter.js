import { Router } from "express";
import { Listings, Users } from "../models/db";

router = Router();

router.post('/filter', async(req,res)=>{
    const {category, minPrice,maxPrice} = req.body;
    let query = {}
    if(category)
        query.category= category;
    if(minPrice||maxPrice)
    {
        query.price = {$gte: minPrice|| 0 , $lte: maxPrice|| Infinity};
    }
        
    const suitableItems = await Listings.find(query);
    return res.json({success:true, filter:suitableItems});
})