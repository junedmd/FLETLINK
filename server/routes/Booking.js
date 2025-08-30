import express from "express";
const router=express.Router();


import {createBooking,deleteBooking,getBooking} from "../controllers/BookingControllers.js"

router.post("/", createBooking);
router.delete("/:id", deleteBooking);
router.get("/",getBooking)
export default router;