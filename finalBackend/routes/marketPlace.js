import { Router } from "express";
import { jwtAuthentication } from "../authentication/authent.js";
import { Listings, Users } from "../models/db.js";

 const router = Router()


router.post('/getMarketPlace',async(req,res)=>{
    const {userID,limit} = req.body;
    const noCache = (url)=>`${url}?nocache=${Date.now()}`;
    try{
        const listings = await Listings.find({}).populate('seller','userName').skip(0).limit(12);
        const user = await Users.findById(userID).populate('favorites','_id').populate('cart','_id');
        res.set({'Cache-Control': 'no-store,no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        });
        if(listings&& user)
        {
            const Listings = listings.map((item)=>{
                const itemObj =item.toObject();
                return {...itemObj,image:noCache(itemObj.image)}});
            const favorites = user.favorites.map((item)=>{
                    const itemObj = item.toObject();
                    return {...itemObj,image: noCache(itemObj.image)}
                })
            res.json({success:true, listings:listings , likedList:favorites,cartList:user.cart})
        }
        else{
            res.status(500).json({success:false,"message":"Error while fetching MarketPlace details form db"})
        }
    }catch(e){
        res.json({success:false,message:"Internal server error while fetching marketPlace from db"});
    }

})

router.post('/getItems',async(req,res)=>{
    const {pageNo,limit} = req.body;
    const skip = (pageNo-1)*limit;
    const noCache = (url)=>`${url}?nocache=${Date.now()}`;
    try{
        const listings = await Listings.find({}).populate('seller','userName').skip(skip).limit(limit);
        const listingss = listings.map((list)=>{
            const listObj = list.toObject();
            return {...listObj,image:noCache(listObj.image)}
        });
        res.status(200).json({success:true,listings:listingss})
    }catch(e)
    {
        res.status(500).json({success:false, message:"Internal Server error while Fetching Getting Items"});
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

router.post('/addtocart',jwtAuthentication,async(req,res)=>{
    const {userID,listingID} = req.body;
    try{
        await Users.findByIdAndUpdate(userID,{$addToSet:{cart:listingID}});
        res.status(200).json({success:true, message:"item succesfully added to cart!"});
    }catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error while Adding item to cart"})

    }
})

router.post('/removefromcart',jwtAuthentication,async(req,res)=>{
    const {userID,listingID} = req.body;
    try{
        await Users.findByIdAndUpdate(userID,{$pull:{cart:listingID}});
        res.status(200).json({success:true, message:"item succesfully removed from cart!"});
    }catch(e)
    {
        res.status(500).json({success:false, message:"Internal server error while removing item from cart"})

    }})

export default router;

