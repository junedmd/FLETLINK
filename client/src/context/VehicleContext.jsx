import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
const VehicleContext = createContext();


export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);      
  const [booking, setBooking] = useState([]);       
  const [loading, setLoading] = useState(true);

 
  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API}/api/vehicles`);
      setVehicles(res.data.data); 
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/api/bookings`);
      setBooking(res.data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };


  const cancelBooking = async (id) => {
    try {
      await axios.delete(`${API}/api/bookings/${id}`);
       toast.success("Booking Cancel");
      fetchBookings(); 
    } catch (err) {
      console.error("Error canceling booking:", err);
      alert(err.message);
    }
  };

 
  useEffect(() => {
    fetchVehicles();
    fetchBookings();
  }, []);

  return (
    <VehicleContext.Provider
      value={{ vehicles, booking,setBooking, loading, fetchVehicles, fetchBookings, cancelBooking }}
    >
      {children}
    </VehicleContext.Provider>
  );
};


export const useVehicleContext = () => useContext(VehicleContext);
