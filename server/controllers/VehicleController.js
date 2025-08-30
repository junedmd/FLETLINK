
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import  getDuration  from "../utils/Duration.js";


export const addVehicle= async(req, res)=> {
  try {
    const { name, capacityKg, tyres } = req.body;

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json({
            success: true,
            data: vehicle,
            message: "Add Vehicle successfully !!"
    });
  } catch (error) {
   res.status(500).json({ success: false, message: error.message });
}
};

export const getAvailableVehicles= async(req, res)=> {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    const duration = getDuration(fromPincode, toPincode);
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    let vehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    const bookings = await Booking.find({
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    const bookedIds = bookings.map((b) => b.vehicleId.toString());
    vehicles = vehicles.filter((v) => !bookedIds.includes(v._id.toString()));

    res.json({ vehicles, estimatedDurationHours: duration });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVehicles = async (req,res)=>{
  try{
    const vehicles= await Vehicle.find();
    res.status(201).json({
        success:true,
        data:vehicles,
        message:"You Successfully Get All vehicles"
    })  
  }catch(error){
     res.status(500).json({ success: false, message: error.message })
  }
}