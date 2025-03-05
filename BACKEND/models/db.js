import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/CampusMart");

const userSchema = new mongoose.Schema({
    userName:String,
    // email:String,
    rollNumber:String,
    batch: String,
    password:String
})

export const Users = mongoose.model('Users',userSchema);

