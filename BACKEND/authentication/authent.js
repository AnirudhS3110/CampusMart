import { Users } from "../models/db.js";
import bcrypt from 'bcrypt'
import { passwordSchema, emailSchema, userNameSchema, rollNumberSchema } from "../models/validation.js";


export function isValidUsername(req,res,next)
{
    const username = req.body.username;
    try{
        const result = userNameSchema.safeParse(username);
        if(!result.success)
        {
            return res.json({success:false, message:"Invalid username"});
        }
        next();
    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"internal server error from username"});
    }
}



export function isValidPassword(req,res,next)
{
    const password = req.body.password;
    try{
        const result = passwordSchema.safeParse(password);
        if(!result.success)
            {
                return res.json({success:false, message:"Invalid password"});
            }
        next();
    }
    catch(e)
    {
        return res.json({success:false, message:"internal server error from isValidPass"});
    }
}

export function isValidEmail(req,res,next)
{
    const email = req.body.email;
    try{
        const result = emailSchema.safeParse(email);
        if(!result.success)
            {
                return res.json({success:false, message:"Invalid email"});
            }
        next();
    }
    catch(e)
    {
        return res.json({success:false, message:"internal server error"});
    }
}

export function isValidRollNo(req,res,next)
{
    const rollNo = req.body.rollnumber;
    try{
        const result = rollNumberSchema.safeParse(rollNo);
        if(!result.success)
            {
                return res.json({success:false, message:"Invalid roll Number"});
            }
        next();
    }
    catch(e)
    {
        return res.json({success:false, message:"internal server error from isValidRollNo"});
    }
}

export function verifyPassword(req,res,next)
{
    const password = req.body.password;
    const checkPassword = req.body.checkpassWord;
    try{
        const result = passwordSchema.safeParse(checkPassword);
        if(!result.success || password !== checkPassword )
            {
                return res.json({success:false, message:"Re-enter your password correctly"});
            }
        next();
    }
    catch(e)
    {
        return res.json({success:false, message:"internal server error from VerifyPasswoerd"});
    }
}

export async function comparePassword(req,res,next)
{
    const rollNo = req.body.rollnumber;
    const password = req.body.password;
    try{
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