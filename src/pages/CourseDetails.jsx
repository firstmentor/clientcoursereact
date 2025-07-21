import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/courseView/${id}`);
        setCourse(res.data.course);
      } catch (error) {
        toast.error("❌ Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      toast.warning("⚠️ Please login to book this course");
      return navigate('/login');
    }

    setBookingLoading(true);
    toast.success("✅ Redirecting to booking...");
    setTimeout(() => {
      navigate(`/booking/${id}`);
    }, 1000); // short delay for toast
  };  

  if (loading) return <div className="text-center py-5">Loading course...</div>;

  if (!course) return <div className="text-center py-5 text-danger">Course not found</div>;

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-md-5">
          <img
            src={course.image}
            alt={course.title}
            className="img-fluid rounded shadow-lg border"
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold mb-3 text-primary">{course.title}</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>{course.description}</p>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <strong>Price:</strong> ₹{course.price}
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <strong>Duration:</strong> {course.duration}
            </li>
          </ul>

          <button
            onClick={handleBooking}
            className="btn btn-success px-4 py-2"
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Booking...
              </>
            ) : user ? 'Book Now' : 'Login to Book'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
