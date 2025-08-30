import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;
export default function SearchBook() {
  const [query, setQuery] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState(null)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/api/vehicles/available`, { params: query });

      if (res?.data?.vehicles?.length > 0) {
        setResults(res.data.vehicles);
        setEstimatedDuration(res.data.estimatedDurationHours)
        setMessage("Estimated Duration: " + res.data.estimatedDurationHours + " hours");
        console.log("Search results:", res.data.vehicles);
      } else {
        setMessage("No vehicles found");
      }
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Please fill all the detail Correct" );
      setMessage("Error: " + (err.response?.data?.message || "Please filled all the detail correct"));
    }
  };

  const handleBook = async (vehicleId) => {
    try {
      const body = { ...query, vehicleId, customerId: "cust123" };
      const res = await axios.post(`${API}/api/bookings`, body);
      
      toast.success("Booking Confirmed successfully");
      
      navigate("/booking");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error(" Booking failed: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
   <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
  <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
    
    
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Search & Book Vehicle
      </h2>

      <div className="space-y-4">
        <input
          name="capacityRequired"
          placeholder="Capacity Required (kg)"
          value={query.capacityRequired}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={query.fromPincode}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={query.toPincode}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          name="startTime"
          type="datetime-local"
          value={query.startTime}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-2 rounded-xl font-semibold transition duration-200"
        >
          Search
        </button>
      </div>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>

   
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-2/3 max-h-[80vh] overflow-y-auto">
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((v) => (
            <li
              key={v._id}
              className="flex justify-between items-center p-4 border rounded-xl shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{v.name}</p>
                <p className="text-sm text-gray-600">
                  {v.capacityKg} kg | {v.tyres} tyres
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  Estimated Duration: {v.estimatedDurationHours || estimatedDuration} hours
                </p>
              </div>
              <button
                onClick={() => handleBook(v._id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 cursor-pointer  py-2 rounded-xl transition duration-200"
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No vehicles found</p>
      )}
    </div>
  </div>
</div>
  );
}
