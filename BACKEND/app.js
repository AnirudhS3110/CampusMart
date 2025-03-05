import express from "express"
import cors from "cors"
import Signin from './routes/signin.js'
import Signup from './routes/signup.js'

//Installing nodemon by typing 
 const app = express();
 app.use(cors());
 app.use(express.json());

 app.use("/authentication", Signin);
 app.use("/authentication", Signup);


export default app; 


