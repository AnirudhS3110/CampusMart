import http from 'http'
import WebSocket, {WebSocketServer} from 'ws';
import { Chats, Messages } from './models/db.js';

const server = http.createServer()

const wss = new WebSocketServer({server});

const onlineUsers = new Map();
const Rooms = new Map();



wss.on('connection',(ws)=>{
    console.log("new client connected: "+ws._socket.remoteAddress)
    
    ws.on('error', console.error)

    ws.on('message', async(message)=>{
        try{
            const json = JSON.parse(message);
            switch(json.type)
            {
                case "join":
                    ws.send(JSON.stringify({
                        "type":"server-status",
                        "payload":{
                            "status":"connected"
                        }
                    }));    
                    const userID = json.payload.userID;
                    onlineUsers.set(userID,ws);
                    break;
                    
                

                case "message":
                    // console.log("Message: ", json.payload.message.toString()); 
                    Rooms.get(json.payload.chatID).forEach((member)=>{
                        if(onlineUsers.has(member))
                        {
                            onlineUsers.get(member).send(JSON.stringify({
                                "type":"notify",
                                "payload":{
                                    "chatID":json.payload.chatID,
                                    "lastMessage":json.payload.message
                                }
                            }))
                        }
                    })

                    if(Rooms.get(json.payload.chatID).includes(json.payload.receiver)) //If the user is has opened the chat
                    {
                        onlineUsers.get(json.payload.receiver).send(JSON.stringify({
                            "type":"message",
                            "payload":{
                                "chatID":json.payload.chatID,
                                "sender":json.payload.sender,
                                "message":json.payload.message,
                                "status":"seen"
                            }
                        }));
                        
                        try{const res = await Messages.create({
                            chatID:json.payload.chatID,
                            sender:json.payload.sender,
                            receiver:json.payload.receiver,
                            message:json.payload.message,
                            status:"seen"
                        })}
                        catch(e){
                            console.error("Error while storing message to db")
                        } 
                        
                    }
                    else if(onlineUsers.has(json.payload.receiver))  // If the Reciever is online but hasnt yet opened the chat, notify the user and store the message to db
                    {
                        onlineUsers.get(json.payload.receiver).send(JSON.stringify({
                            "type":"notify",
                            "payload":{
                                "chatID":json.payload.chatID,
                                "lastMessage":json.payload.message,
                                "status":"sent"
                            }
                        })) 
                        try{const res = await Messages.create({
                            chatID:json.payload.chatID,
                            sender:json.payload.sender,
                            receiver:json.payload.receiver,
                            message:json.payload.message,
                            status:"sent"
                        })}
                        catch(e){
                            console.error("Error while storing message to db")
                        }       
                    }
                    else //IF the receiver is offline. store the message in db
                    {
                       
                        
                        console.log("Message is to be stored ot db");
                        try{const res = await Messages.create({
                            chatID:json.payload.chatID,
                            sender:json.payload.sender,
                            receiver:json.payload.receiver,
                            message:json.payload.message
                        })
                        console.log("Message stored");
                    }
                           
                        catch(e){
                            console.error("Error while storing message to db")
                        }   
                    }
                    break;

                    case "enterRoom":
                    console.log("Entered room");
                    const {chatID,first,second} = json.payload;
                    //Checking if a room with the roomID alrdy exists
                    if(Rooms.has(chatID)) //If yes, then just push the user into the room, then notify teh other person in the room that the secnd one has entered the room!
                    {
                        Rooms.get(chatID).push(first);
                        if(Rooms.get(chatID).includes(second))
                        {
                            onlineUsers.get(second).send(JSON.stringify({type:"updateStatus"})) ; 
                            Rooms.get(chatID).forEach((user)=>{
                                onlineUsers.get(user).send(JSON.stringify({"type":"seen"}))
                            })
                        }
                        else{  //if there is no other user, just send the message is delivered to the user
                            ws.send(JSON.stringify({
                                "type":"delivered",
                                })); 
                        }
                        
                    }
                    else  // if the room doesnt exist, then create a new room with roomID = chatID, then push themselve
                    {
                        Rooms.set(chatID, [first]);
                    }
                    break;

                    case "exitRoom":
                    const {chatID1,userID1} = json.payload;
                    const receiver = Rooms.get(chatID1).filter((member)=>member!==userID1)

                    if(receiver.length==0) //checking if the reciver is in the room
                    {
                        Rooms.delete(chatID1); //if the sender is the only one in the room, then delete the room.
                    }
                    else{
                        if(onlineUsers.has(receiver[0])) // if reciever is there in the room, notify that the sender has left.
                        {
                            onlineUsers.get(receiver[0]).send(JSON.stringify({
                                "type":"left"
                            }))
                        }
                        Rooms.set(chatID1,receiver);
                    }
                    break;
        }

        }catch(e){
            console.log("Invalid JSON", e);
        }
    })
    
    ws.on('close',()=>{
        for(let [userID, socket] of onlineUsers)
        {
            if(socket===ws)
                onlineUsers.delete(userID);
            break;
        }
    })
});


server.listen(5000,()=>console.log("Server is running at 5000"))