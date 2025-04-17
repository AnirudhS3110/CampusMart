import mongoose from "mongoose";

mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/CampusMart");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,  
    image: String, 
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



const RoomSchema = new mongoose.Schema({
    members:[{type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true}],
    lastMessage:{type:mongoose.Schema.Types.String, ref:'Messages'},
    lastMessageAt:{type:Date, default: Date.now},   
    unreadMessages:{type:Object}
})

export const Chats = mongoose.model('Chats',RoomSchema);

 

const messageSchema = new mongoose.Schema({
    chatID:{type:mongoose.Schema.Types.ObjectId, ref:'Chats'},
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}, 
    message: {type:String},
    status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" },
    createdAt: { type: Date, default: Date.now }

})

messageSchema.post('save', async(doc)=>{
    console.log("Entered the save post thingy")
    try{
        const chat = await Chats.findById(doc.chatID);
        console.log("Got the chat");
        if (!chat || !chat.members) return;
        console.log("Okay chat is presrnt");
        const membersArray = Array.isArray(chat.members) ? chat.members : chat.members?.toObject?.()?.members || [];
        console.log("Members array:",membersArray);
        const members = chat.members.map(id => id.toString());
        console.log("Menmebrs: ",members);
        const receiverID = members.filter(id=>id.toString()!== doc.sender.toString())
        console.log("RecieverID: ",receiverID[0]);
        (doc.status == 'sent' || doc.status=='delivered') ? 
        await Chats.findByIdAndUpdate(doc.chatID,{$set:{lastMessage:doc.message, lastMessageAt: doc.createdAt }, $inc:{[`unreadMessages.${receiverID[0]}`]: 1}}) : await Chats.findByIdAndUpdate(doc.chatID,{$set:{lastMessage:doc.message, lastMessageAt: doc.createdAt} })
    }
    catch(e)
    {
        console.log("Error while saving: ",e);
    }
}) 


export const Messages = mongoose.model('Messages',messageSchema)
export const Users = mongoose.model('Users',userSchema);
export const Listings = mongoose.model('Listings',listingSchema);






