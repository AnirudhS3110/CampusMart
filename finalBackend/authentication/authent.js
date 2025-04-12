import { Users } from "../models/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { passwordSchema, emailSchema, userNameSchema, rollNumberSchema } from "../models/schema.js";

const secretPass = 'S3crEt';



export async function comparePassword(req,res,next)
{
    const rollNo = req.headers.rollnumber;
    const password = req.headers.password;
    try{
        if(rollNo == '' || !rollNo)
            return res.json({success:false, message:"RollNumber unaivalable"})
        const user = await Users.findOne({rollNumber:rollNo})
        if(!user)
            return res.json({success:false ,  message:"user does not exist"});

        const result = await  bcrypt.compare(password, user.password );
        if(!result)
        {
            return res.status(401).json({success:false, message:"Incorrect password"});
        }
        next();
    }
    catch(e)
    {
        return res.json({success:false, message:"internal server error from comparePassword"});
    }

}

export function jwtAuthentication(req,res,next)
{
    const token = req.headers.authorization;
    if(!token)
        return res.status(401).json({success:false, message:"invalid token"});

    try{
        const payload = jwt.verify(token,secretPass);
        req.body.payload = payload;
        next();
    }
    catch(e)
    {
        return res.status(401).json({success:false, message:"invalid token"});
    }


}