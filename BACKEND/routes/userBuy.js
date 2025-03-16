import { Router } from "express";
import { jwtAuthentication } from "../authentication/authent.js";
import { Users, Listings } from "../models/db.js";
const router = Router();

router.post('addToCart', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.rollNumber;
    const id = req.body.id;
    try{
        const addedProduct = await Users.findOneAndUpdate({rollNumber:rollNo},{$addToSet:{cart:id}});
        return res.status(201).json({success:true, message:"Product successfully added to Cart"});
    }
    catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error"});
    }

})

router.post('removeFromCart', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.rollNumber;
    const id = req.body.id;
    try{
        const deletedProduct = await Users.findOneAndUpdate({rollNumber:rollNo},{$pull:{cart:id}});
    return res.status(201).json({success:true, message:"Product successfully removed from cart"});
    }
    catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error"});
    }
})

router.get('/viewCart', jwtAuthentication , async(req,res)=>{
    const rollNo = req.body.rollNumber;
    try{
        const userCart = await Users.find({rollNumber:rollNo}).populate("cart");
        return res.json({success:true,userCart:userCart.cart});
    }
    catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error"});
    }
})



export default  router;

