
 
 
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import router from "./routes/project.route.js"

dotenv.config()
   
const port = process.env.PORT || 5005

const app = express()
app.use(express.json())
app.use("/", router)

app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}))


app.get("/",(req, res)=>{
    res.json("hello from services/project")
})

app.listen(port, ()=>{
    connectDb()
    console.log(`project started, ${port}`);
})

