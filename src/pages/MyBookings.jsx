import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/my-bookings');
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      setLoadingId(bookingId);
      const res = await API.put(`/booking/cancel/${bookingId}`);
      toast.success(res.data.message || "Booking cancelled!");
      fetchBookings();
    } catch (err) {
      toast.error("Cancel failed!");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      setLoadingId(bookingId);
      const res = await API.delete(`/booking/delete/${bookingId}`);
      toast.success(res.data.message || "Booking deleted!");
      fetchBookings();
    } catch (err) {
      toast.error("Delete failed!");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Course Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="row">
          {bookings.map((b, index) => {
            const isCancelled = b.status === 'Cancelled';
            return (
              <div className="col-md-4 mb-3" key={index}>
                <div className={`card shadow ${isCancelled ? 'bg-light text-muted' : ''}`}>
                  <img
                    src={b.course.image}
                    className="card-img-top"
                    alt={b.course.title}
                    style={{ filter: isCancelled ? 'grayscale(100%)' : 'none' }}
                  />
                  <div className="card-body">
                    <h5 className={`card-title ${isCancelled ? 'text-decoration-line-through' : ''}`}>
                      {b.course.title}
                    </h5>
                    <p className={`card-text ${isCancelled ? 'text-decoration-line-through' : ''}`}>
                      ₹{b.price}
                    </p>
                    <p className="card-text small">
                      Booked on: {new Date(b.bookedAt).toLocaleDateString()}
                    </p>
                    <span className={`badge ${isCancelled ? 'bg-secondary' : 'bg-success'} mb-2`}>
                      {isCancelled ? 'Cancelled' : 'Confirmed'}
                    </span>
                    <div className="d-flex gap-2">
                      {!isCancelled && (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleCancel(b._id)}
                          disabled={loadingId === b._id}
                        >
                          {loadingId === b._id ? "Cancelling..." : "Cancel Booking"}
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(b._id)}
                        disabled={loadingId === b._id}
                      >
                        {loadingId === b._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
