import express from "express"
import cors from "cors"
import Signin from './routes/signin.js'
import Signup from './routes/signup.js'
import SingleUpload from './routes/upload.js'
import UserSell from './routes/userSell.js'
import UserBuy from './routes/userBuy.js'
import Chats from "./routes/chat.js"

//Installing nodemon by typing 
 const app = express();
 app.use(cors());
 app.use(express.json());

 app.use("/authentication", Signin);
 app.use("/authentication", Signup);
 app.use("/uploads",SingleUpload);
 app.use("/users",UserSell);
 app.use("/users",UserBuy);
 app.use("/chats",Chats);

export default app;