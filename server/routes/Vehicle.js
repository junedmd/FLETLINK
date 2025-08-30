import express from "express";
const router=express.Router();
import { addVehicle,getAvailableVehicles ,getVehicles} from "../controllers/VehicleController.js";

router.post("/", addVehicle); // Add a new Vehicle
router.get("/available", getAvailableVehicles); // Get all Vehicle api
router.get("/", getVehicles);
export default router;