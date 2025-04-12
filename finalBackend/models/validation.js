import z from "zod"


const userNameSchema = z.string().min(1);
const passwordSchema = z.string().min(8);
const emailSchema = a.string.email()