import mongoose, { Schema } from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        capacityKg: { type: Number, required: true },
        tyres: { type: Number, required: true },
    },
    {
        timestamps:true,
        }
 
);
 const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;




