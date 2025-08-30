import React from 'react'
import { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
function Vehicles() {

  const [tyres, setTyres] = useState("");
  const [name, setName] = useState("");
  const [capacityKg, setCapacityKg] = useState("");

  const submitData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/vehicles", {
        tyres,
        name,
        capacityKg
      });

      if (response?.data?.success) {
         toast.success("Vehicle Added successfully!");
        setName("");
        setCapacityKg("")
        setTyres("")
       console.log("Vehicle added:", response.data.message);

      } else {
       
          toast.error("Failed to Add Vehicles!");
      }
    } catch (error) {
      console.error("Signup error:", error);
       toast.error("Failed to Add booking!");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
  <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xs">
    <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Add Vehicle</h2>
    <div className="space-y-3">
      <input
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
      />
      <input
        name="capacityKg"
        type="number"
        placeholder="Capacity (kg)"
        value={capacityKg}
        onChange={(e) => setCapacityKg(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
      />
      <input
        type="text"
        placeholder="Tyres"
        value={tyres}
        onChange={(e) => setTyres(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
      />
      <button
        type="button"
        onClick={submitData}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm"
      >
        Add
      </button>
    </div>
  </div>
</div>
  )
}

export default Vehicles

