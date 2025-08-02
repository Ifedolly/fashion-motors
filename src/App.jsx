import React from 'react'
import { Routes, Route } from 'react-router-dom'

//Layout
import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";

//Pages
// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import ServiceDetail from "./pages/ServiceDetail";
// import Gallery from "./pages/Gallery";
// import Booking from "./pages/Booking";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <div className='app'>
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App