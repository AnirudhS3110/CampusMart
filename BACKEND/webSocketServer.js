import http from 'http'
import WebSocket, {WebSocketServer} from 'ws';
import { Chats, Messages } from './models/db.js';

const server = http.createServer()

const wss = new WebSocketServer({server});

const onlineUsers = new Map();

// setInterval(() => {
//     console.log("Online Users: ", onlineUsers.size)
//     for(let [userId, socket] of onlineUsers)
//     {
//         console.log("User: ", userId)
//     }  ;
    
// }, 5000);

wss.on('connection',(ws)=>{
    console.log("new client connected: "+ws._socket.remoteAddress)
    
    ws.on('error', console.error)

    ws.on('message', async(message)=>{
        try{
            console.log("Came into message");
            console.log("Message: ", message);
            const json = JSON.parse(message);
            switch(json.type)
            {
                case "join":
                    const userID = json.payload.userID;
                    onlineUsers.set(userID,ws);
                    break;
                case "message":
                    console.log("Message: ", json.payload.message);
                    if(onlineUsers.has(json.payload.receiver))
                    {
                        onlineUsers.get(json.payload.receiver).send(json.payload.message);
                    }
                    else
                    {
                        console.log("Message is to be stored ot db");
                        ws.send("Your message is receiveed");
                        try{const res = await Messages.create({
                            chatID:json.payload.chatID,
                            sender:json.payload.sender,
                            receiver:json.payload.receiver,
                            message:json.payload.message
                        })
                        if(res)
                            ws.send("The response from db:"+res); 
                    }
                           
                        catch(e){
                            console.error("Error while storing message to db")
                        }   
                    }
                    break;
        }

        }catch(e){
            console.error("Invalid JSON")
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