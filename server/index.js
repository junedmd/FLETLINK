import express from "express";
const app = express();

import vehicleRoutes from "./routes/Vehicle.js"
import bookingRoutes from "./routes/Booking.js"
import connectDB from "./config/db.js";
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors({
  origin: ['http://localhost:5173', ],
  methods: ['GET', 'POST' ,'DELETE'],
  credentials: true
}));

const PORT= 5000;


connectDB();

app.get("/aam",(req,res)=>{
        console.log(" aam is jaam");
});


// api routes

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT,()=>{
    console.log(" server is running ")
})