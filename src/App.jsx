import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';  
import Booking from './pages/Booking';
import ChangePassword from './components/ChangePassword';

import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Optional: You can place global min-vh-100 or layout styles here

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
