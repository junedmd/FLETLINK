import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Booking from "./pages/Booking";
import Search from "./pages/Search";
import Vehicles from "./pages/Vehicles";





function App() {


  return (
    <>
     
     
      <nav className='bg-blue-500 text-center items-center py-4 flex justify-evenly text-white text-2xl'>
        <Link to="/vehicle">Add Vehicle</Link> |{" "}
        <Link to="/search">Search & Book</Link> |{" "}
        <Link to="/booking">Bookings</Link>
      </nav>

     <Routes>
        <Route path="/vehicle" element={<Vehicles />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
     
      <Toaster position="top-right" />
   
      
    </>
  )
}

export default App
