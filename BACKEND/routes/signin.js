import express from 'express';
import {Router} from 'express'
import jwt from 'jsonwebtoken'
import { isValidPassword  ,isValidRollNo  } from '../authentication/validation.js';
import { comparePassword } from '../authentication/authent.js';
import { Users } from '../models/db.js';
const secretPass = 'S3crEt';

 const router = Router();

router.get('/signin',isValidRollNo , isValidPassword, comparePassword , async(req,res)=>{
    const rollNumber = req.headers.rollnumber.toString();

    try{
        const user = await Users.findOne({rollNumber:rollNumber});
        if(!user)
            return res.status(400).json({success:false , message:"User not found"}); 
        console.log("Tryyyyy");
        console.log(user);
        console.log(user?.userName);
        const token = jwt.sign(rollNumber,secretPass);
        return res.json({success:true , message:"user is logged in", token:token, rollNumber:rollNumber,userID:user._id,username:user.userName})
    }

    catch(e)
    {
        return res.status(500).json({success:false , message:"Internal server error"});
    }
})

export default router