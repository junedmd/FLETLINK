import express from "express";
const app = express();
import connectDB from "./config/db.js";
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors({
  origin: ['http://localhost:5173', ],
  methods: ['GET', 'POST' ],
  credentials: true
}));

const PORT= 5000;

// Connect to database
connectDB();

app.get("/aam",(req,res)=>{
        console.log(" aam is jaam");
})
app.listen(PORT,()=>{
    console.log(" server is jaam daedjkaed running ")
})