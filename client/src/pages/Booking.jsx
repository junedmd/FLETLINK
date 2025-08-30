import { useState, useEffect } from "react";
import axios from "axios";
import { useVehicleContext } from "../context/VehicleContext";

export default function Bookings() {
  
 const { vehicles, booking, loading, fetchBookings, cancelBooking } = useVehicleContext();

 const getVehicleName = (vehicleId) => {
  const vehicle = vehicles.find((v) => v._id === vehicleId);
  return vehicle ? vehicle.name : "Unknown Vehicle";
};

const getVehiclCapacity = (vehicleId) => {
  const vehicle = vehicles.find((v) => v._id === vehicleId);
  return vehicle ? vehicle.capacityKg : "1000kg";
};

const getVehiclTyres = (vehicleId) => {
  const vehicle = vehicles.find((v) => v._id === vehicleId);
  return vehicle ? vehicle.tyres : "12";
};


 useEffect(() => {
    fetchBookings();
  }, []);



  return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
  <div className="w-full max-w-5xl">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      My Bookings
    </h2>

    {loading ? (
      <p className="text-center text-gray-500 text-sm">Loading bookings...</p>
    ) : booking.length === 0 ? (
      <p className="text-center text-gray-500 text-sm">No bookings found</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {booking.map((b) => (
          <div
            key={b._id}
            className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-semibold text-gray-800">
                Vehicle: <span className="font-normal">{getVehicleName(b.vehicleId)}</span>
              </p>
              <p>Capacity: <span className="font-medium">{getVehiclCapacity(b.vehicleId)} kg</span></p>
              <p>Tyres: <span className="font-medium">{getVehiclTyres(b.vehicleId)}</span></p>
              <p>From: <span className="font-medium">{b.fromPincode}</span> To: <span className="font-medium">{b.toPincode}</span></p>
              <p className="text-gray-400 text-xs">
                Date: {new Date(b.startTime).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => cancelBooking(b._id)}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full font-medium shadow-sm hover:shadow-md transition duration-200 text-sm"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
}

