import express from 'express';
import {Router} from 'express'
import jwt from 'jsonwebtoken'
import { isValidPassword  ,isValidRollNo } from '../authentication/validation.js';
import { comparePassword } from '../authentication/authent.js';
const secretPass = 'S3crEt';

 const router = Router();

router.get('/signin',isValidRollNo , isValidPassword, comparePassword , (req,res)=>{
    const rollNumber = req.headers.rollnumber;

    try{
        const token = jwt.sign(rollNumber,secretPass);
        return res.json({success:true , message:"user is logged in", token:token})
    }

    catch(e)
    {
        return res.status(500).json({success:false , message:"Internal server error"});
    }
})

export default router