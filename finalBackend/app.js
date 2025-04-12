import express from "express"
import cors from "cors"
import Signin from './routes/signin.js'

import uploadWorker from "./Workers/uploadWorker.js"
import Signup from './routes/signup.js'
import SingleUpload from './routes/upload.js'
import UserSell from './routes/userSell.js'
import UserBuy from './routes/userBuy.js'
import Chats from "./routes/chat.js"
import Dashboard from "./routes/dashboard.js"
import MarketPlace from "./routes/marketPlace.js"
// import rateLimit from "express-rate-limit"

//Installing nodemon by typing 
 const app = express();
 app.use(cors());
 app.use(express.json());
//  const limitter = rateLimit({
//     windowMs: 60*1000,
//     max:10,
//     message:"Too many requests from this IP, please try again later"cd
//  })
//  app.use(limitter);
 app.use("/authentication", Signin);
 app.use("/authentication", Signup);
 app.use("/uploads",SingleUpload);
 app.use("/users",UserSell);
 app.use("/users",UserBuy);
 app.use("/chats",Chats);
 app.use("/users",Dashboard);
 app.use("/marketplace",MarketPlace)

export default app;