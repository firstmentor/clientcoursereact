import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/course');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {/* ✅ Banner Section with Blurred Overlay */}
      <section className="position-relative d-flex align-items-center justify-content-center text-center" style={{ height: '80vh', overflow: 'hidden' }}>
        {/* Background Image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('https://pninfosys.org/bannerFinal.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px) brightness(0.6)',
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div className="container position-relative text-white" style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold text-shadow">Welcome to PNCOURSE</h1>
          <p className="lead fs-4">Join industry-ready tech courses and supercharge your career today!</p>
          <Link to="/courses" className="btn btn-light btn-lg rounded-pill mt-4 px-4 py-2 shadow">
            Explore Courses
          </Link>
        </div>
      </section>

      {/* ✅ Popular Courses */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">🔥 Popular Courses</h2>
          <div className="row g-4">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="col-md-6 col-lg-4" key={course._id}>
                  <div className="card h-100 border-0 shadow-sm rounded-4 transition" style={{ transition: '0.3s' }}>
                    <img
                      src={course.image || 'https://via.placeholder.com/400x250?text=Course'}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x250?text=Course'; }}
                      alt={course.title}
                      className="card-img-top rounded-top"
                      style={{
                        height: '220px',
                        objectFit: 'contain',
                        backgroundColor: '#f9f9f9',
                        padding: '10px'
                      }}
                    />
                    <div className="card-body d-flex flex-column text-center">
                      <h5 className="card-title fw-semibold text-dark">{course.title}</h5>
                      <p className="text-muted small mb-2">
                        {course.description?.length > 70
                          ? course.description.slice(0, 70) + '...'
                          : course.description}
                      </p>
                      <p className="fw-bold text-primary mb-3">₹{course.price}</p>
                      <Link
                        to={`/course/${course._id}`}
                        className="btn btn-outline-primary rounded-pill mt-auto w-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted">
                <p>No courses available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose PNCOURSE?</h2>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-person-check-fill fs-1 text-primary mb-3"></i>
                <h5>Expert Trainers</h5>
                <p className="text-muted">Learn from professionals with real industry exposure.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-briefcase-fill fs-1 text-success mb-3"></i>
                <h5>Career Support</h5>
                <p className="text-muted">Get placement help, resume reviews & interview prep.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-4 shadow-sm h-100 bg-white">
                <i className="bi bi-laptop fs-1 text-warning mb-3"></i>
                <h5>Project-Based Learning</h5>
                <p className="text-muted">Build real projects to strengthen hands-on skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
