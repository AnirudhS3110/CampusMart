import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/CampusMart");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,  
    images: [String], 
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  
    status: {type: Boolean, default:true},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    createdAt: { type: Date, default: Date.now }
});



const userSchema = new mongoose.Schema({
    userName:String,
    // email:String,
    rollNumber:String,
    batch: String,
    password:String,
    profilePic:String,
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listings' }], 
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listings' }], 
    cart: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Listings'}],
    createdAt: { type: Date, default: Date.now }
})

// const chatSchema = new mongoose.Schema(
//     {
//       sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
//       receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
//       message: { type: String, required: true },
//       status: {
//         type: String,
//         enum: ['sent', 'delivered', 'seen'],
//         default: 'sent'
//       }
//     },
//     { timestamps: true } // Auto-creates createdAt & updatedAt fields
//   );

const RoomSchema = new mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true}],
    
})

const messageSchema = new mongoose.Schema({
    chatID:{type:mongoose.Schema.Types.ObjectId, ref:'Chats'},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}, 
    message: {type:String, required:true},
    status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" },
    createdAt: { type: Date, default: Date.now }

})
  

export const Chats = mongoose.model('Chats',RoomSchema);
export const Messages = mongoose.model('Messages',messageSchema)
export const Users = mongoose.model('Users',userSchema);
export const Listings = mongoose.model('Listings',listingSchema);

