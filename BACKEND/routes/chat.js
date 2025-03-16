import { Router } from "express";  
import { Chats, Messages } from "../models/db.js";
import { jwtAuthentication } from "../authentication/authent.js";
import mongoose from "mongoose";

const router = Router();



router.post('/createChat',jwtAuthentication,async(req,res)=>{
    const {first,second} = req.body
    try{
        const chat = await Chats.findOne({members:{$all:[new mongoose.Types.ObjectId(first), new mongoose.Types.ObjectId(second)]}});
        if(!chat)
        {
            const newChat = await Chats.create({members:[first,second]});
            const messages = await Messages.create({chatID:newChat._id});
            return res.json({success:true, roomID: newChat._id})
        }
        else{
            const messages = await Messages.find({chatID: chat._id}).sort({createdAt:1});
            return res.json({success:true, roomID: chat._id, messages:messages})
        }

    }catch(e){
        res.status(500).json({success:false, message:"Internal server Error while creating chat room."});
    }
})

router.post('/getChats',jwtAuthentication,async(req,res)=>{
    const userID = req.body.userid;
    try{
        const chatList = await Chats.find({members:new mongoose.Types.ObjectId(userID)}).populate('members');
        const chats = chatList.flatMap((chat)=>{
            return chat.members.filter((member)=>member.id.toString()!==userID);
    })
        return res.json({success:true,chats:chats});

    }catch(e){
        res.status(500).json({success:false, message:"Internal server Error while fetchng chats."});
    }

})


router.post('/unreadMessages',async(req,res)=>{
    const userID = req.body.userID;
    try{ 
        const unreadMessages = await Messages.find({receiver:new mongoose.Schema.Types.ObjectId(userID),"status":"sent"});
        res.json({success:true,notificationCount:unreadMessages.length})
    }catch(e){
        res.status(500).json({success:false, message:"Internal server Error while fetching notification count."});
    }

})


router.post('/findChat',async(req,res)=>{
    const {first,second} = req.body
    try{

    }catch(e){

    }
})

export default router;

