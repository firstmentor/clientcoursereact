import React, { useEffect, useState } from 'react';
import API from '../services/api'; // your axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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
      {/* Banner Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to PNINFOSYS</h1>
          <p className="lead">
            Join industry-oriented tech courses and launch your career with confidence!
          </p>
          <a href="/courses" className="btn btn-light btn-lg mt-3">Explore Courses</a>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Popular Courses</h2>
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-4 mb-4" key={course._id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={course.image || 'https://via.placeholder.com/400x250?text=Course'}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description.slice(0, 80)}...</p>
                    <p className="fw-bold text-primary">₹{course.price}</p>
                    <Link to={`/course/${course._id}`} className="btn btn-outline-primary mt-auto">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <div className="text-center text-muted">
                <p>No courses found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose PNINFOSYS?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Expert Trainers</h4>
                <p>Learn from industry professionals with real-world experience.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Career Support</h4>
                <p>Resume building, mock interviews, and placement assistance.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h4>Project-Based Learning</h4>
                <p>Hands-on real projects to build your confidence and skills.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
