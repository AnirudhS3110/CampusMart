import express from 'express';
import {Router} from 'express'
import jwt from 'jsonwebtoken'
import { isValidPassword  ,isValidRollNo } from '../authentication/validation.js';
import { comparePassword } from '../authentication/authent.js';
import { Users } from '../models/db.js';
const secretPass = 'S3crEt';

 const router = Router();

router.get('/signin',isValidRollNo , isValidPassword, comparePassword , (req,res)=>{
    const rollNumber = req.headers.rollnumber;

    try{
        const user = Users.find({rollNumber:rollNumber});
        const token = jwt.sign(rollNumber,secretPass);
        return res.json({success:true , message:"user is logged in", token:token, rollNumber:rollNumber,userID:user._id,username:user.userName})
    }

    catch(e)
    {
        return res.status(500).json({success:false , message:"Internal server error"});
    }
})

export default router