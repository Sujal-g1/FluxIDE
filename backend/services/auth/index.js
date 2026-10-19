 
 
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import router from "./routes/auth.route.js"

dotenv.config()
   
const port = process.env.PORT || 5004

const app = express()
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}))

app.use("/", router)

app.get("/",(req, res)=>{
    res.json("hello from services/auth")
})

app.listen(port, ()=>{
    connectDb()
    console.log(`auth started, ${port}`);
})

