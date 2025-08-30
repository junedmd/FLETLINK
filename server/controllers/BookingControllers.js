// backend/src/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";

import  getDuration  from "../utils/Duration.js";

export const createBooking =async(req, res)=> {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

    const duration = getDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const conflict = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });
    if (conflict) return res.status(409).json({ error: "Vehicle already booked" });

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json({
        success:true,
        data:booking,
        message:"You Successfully Book Vehicle"
    })
        
  } catch (error) {
    res.status(500).json({
        success:false,
        message:"You Successfully Book"
    })
  }
}

export const getBooking = async (req,res)=>{
  try{
    const bookings= await Booking.find();
    res.status(201).json({
        success:true,
        data:bookings,
        message:"You Successfully Get All Bookings"
    })  
  }catch(error){
     res.status(500).json({ success: false, message: error.message })
  }
}
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};