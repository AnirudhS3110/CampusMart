import { Router } from "express";
import { jwtAuthentication } from '../authentication/authent.js';
import { Listings, Users } from '../models/db.js';
const router = Router();

router.post('/getDashboard', jwtAuthentication, async(req,res)=>{
    const rollNo = req.body.rollNumber;
    console.log("rollnumbner: ", rollNo);
    const noCache = (url)=>`${url}?nocache=${Date.now()}`;
    try{
        console.log("inside try block of getDahsboard")
        const user = await Users.findOne({rollNumber:rollNo}).populate({ path: 'favorites', model: 'Listings' });
       
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userListing = await Listings.find({seller:user._id});

        const boughtListings = await Listings.find({buyer:user._id});
       
       
         const favorites = user.favorites.map((item)=>{
            const itemObj = item.toObject();
            return {...itemObj,image: noCache(itemObj.image)}
        })

        const listings = userListing.map((item)=>{
            const itemObj =item.toObject();
            return {...itemObj,image:noCache(itemObj.image)}});
        
            console.log("user.favs: ",user.favorites);
            console.log("userListing: ",userListing);

            res.set({'Cache-Control': 'no-store,no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Content-Type': 'image/jpeg'
            });
            

        return res.json({success:true,username:user.userName, likedListings:user.favorites, userListing:listings, boughtListings:boughtListings});
    } 
    catch(e){
        return res.status(500).json({success:false, message:"Internal server error while sending liked list"});
    }
})

    router.post('/viewListings', jwtAuthentication , async(req,res)=>{
        console.log("Entering viewlistings");
        const rollNo = req.body.rollNumber;
        console.log("Inside viewlistings");
        const user = await Users.findOne({rollNumber:rollNo});
        const userListing = await Listings.find({seller:user._id})

        const noCache = (url)=>`${url}?nocache=${new Date().getTime()}`;
        res.set({'Cache-Control': 'no-store,no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Vary': 'Accept-Encoding'
        });
        const viewLisitng = userListing.map((item)=>{
            const itemObj = item.toObject();
            return {...itemObj,image: noCache(itemObj.image)};
        })
        // for(let i = 0 ; i < 800050000 ; i++){};
        return res.json({success:true,userListing:viewLisitng});
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


