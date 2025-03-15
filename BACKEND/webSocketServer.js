import http from 'http'
import WebSocket, {WebSocketServer} from 'ws';
import { Chats } from './models/db.js';

const server = http.createServer()

const wss = new WebSocketServer({server});

const onlineUsers = new Map();

wss.on('connection',(ws)=>{
    console.log("new client connected: "+ws.url)
    
    ws.on('error', console.error)

    ws.on('message', async(message)=>{
        try{
            const json = JSON.parse(message);
            switch(json.type)
            {
                case "join":
                    const userID = json.payload.userID;
                    onlineUsers.set(userID,ws);
                    break;
                case "message":
                    if(onlineUsers.has(json.payload.receiver))
                    {
                        onlineUsers.get(json.payload.receiver).send(json.payload.message);
                    }
                    else
                    {
                        await Chats.findByIdAndUpdate({_id:json.payload.chatID},{messages:{
                            sender:json.payload.sender,
                            receiver:json.payload.receiver,
                            message:json.payload.message
                        }})
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


server.listen(5000,()=>console.log("Server is running at "))