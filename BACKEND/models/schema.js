import z from "zod"
import { Users } from "./db.js";
import bcrypt from 'bcrypt'


export const userNameSchema = z.string().min(1);
export const passwordSchema = z.string().min(8);
export const emailSchema = z.string().email();
export const rollNumberSchema = z.string();
const titleSchema = z.string().min(1);
const descriptionSchema = z.string().min(1);
const priceSchema = z.number()

export {titleSchema, descriptionSchema, priceSchema};

