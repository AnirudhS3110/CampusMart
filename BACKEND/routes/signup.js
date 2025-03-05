import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import { isValidPassword , isValidUsername ,isValidRollNo, verifyPassword } from '../authentication/authent.js';
import { Users } from '../models/db.js';


const router = Router();

async function hashPassword(pass)
{
    try{
        const hashedPass = await bcrypt.hash(pass,10);
        return hashedPass;
    }
    catch(e)
    {
        console.log("Error during hashing password");
        throw(e);
    }
}


router.post('/signup',isValidUsername , isValidRollNo , isValidPassword, verifyPassword, async(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const rollNo = req.body.rollnumber;
    const batch = rollNo.slice(0,4);    

    try{

        const user = await Users.findOne({rollNumber: rollNo});
        if(user)
            return res.json({success:false, message:"User already exists"});

        const hashedPassword = await hashPassword(password);
        const newUser = await Users.create({userName:username,rollNumber:rollNo,batch:batch,password:hashedPassword});
        return res.json({success:true, message:"User created successfully!"});
    }
    catch(e)
    {
        console.log("Error: " + e);
        return res.status(500).json({success:false , message:"Internal server error from signup"});
    }
})

export default router