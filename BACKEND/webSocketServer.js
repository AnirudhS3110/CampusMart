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
            console.log("Came into message");
            console.log("Type of message: ", typeof(message));
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
                    console.log("Message: ", json.payload.message.toString());  
                    if(Rooms.get(json.payload.chatID).includes(json.payload.receiver))
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
                    else if(onlineUsers.has(json.payload.receiver)) 
                    {
                        onlineUsers.get(json.payload.receiver).send(JSON.stringify({
                            "type":"notify",
                            "payload":{
                                "chatID":json.payload.chatID,
                                "lastMessage":json.payload.message
                            }
                        }))       
                    }
                    else
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
                    if(Rooms.has(chatID))
                    {
                        Rooms.get(chatID).push(first);
                        if(Rooms.get(chatID).includes(second))
                        {
                            onlineUsers.get(second).send(JSON.stringify({type:"updateStatus"})) ; 
                            Rooms.get(chatID).forEach((user)=>{
                                onlineUsers.get(user).send(JSON.stringify({"type":"seen"}))
                            })
                        }
                        else{
                            ws.send(JSON.stringify({
                                "type":"delivered",
                                })); 
                        }
                        
                    }
                    else
                    {
                        Rooms.set(chatID, [first]);
                    }
                    
                    break;

                    case "exitRoom":
                    const {chatID1,userID1} = json.payload;
                    Rooms.get(chatID1).forEach((member)=>{
                        if(onlineUsers.has(member))
                        {
                            const socket = onlineUsers.get(member);
                            if(socket) 
                            {
                                socket.send(JSON.stringify({ type: "offline" }));
                            }
                        }
                    })
                    Rooms.set(chatID1, Rooms.get(chatID1).filter(member=>member!== userID1))
                    console.log(Rooms.get(chatID1));
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
        // wss.clients.forEach((client)=>{
        //     if(client.readyState === WebSocket.OPEN)
        //     {
        //         client.send(JSON.stringify({
        //             "type":"offline",
        //             "payload":{
        //                 "status":"disconnected"
        //             }
        //         }))
        //     }
        // })
    })
});


server.listen(5000,()=>console.log("Server is running at 5000"))