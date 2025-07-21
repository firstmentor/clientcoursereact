import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

function Booking() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/book-course/${id}`);
      toast.success(res.data.message);
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2>Confirm Your Booking</h2>
      <p className="lead">Click below to confirm course booking.</p>
      <button onClick={handleConfirmBooking} className="btn btn-success px-4 py-2" disabled={loading}>
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </div>
  );
}

export default Booking;
