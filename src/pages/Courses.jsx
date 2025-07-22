import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function Courses() {
  const [courseList, setCourseList] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/course');
      setCourseList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">Popular Courses</h2>
      <div className="row">
        {courseList.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src={course.image || 'https://via.placeholder.com/400x250?text=Course'}
                alt={course.title}
                className="card-img-top p-3"
                style={{
                  height: '180px',
                  objectFit: 'contain',
                  borderRadius: '1rem',
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">{course.title}</h5>
                <p className="text-muted small">{course.description?.substring(0, 30)}...</p>
                <p className="fw-bold text-primary">₹{course.price}</p>
                <Link
                  to={`/course/${course._id}`}
                  className="btn btn-outline-primary w-100 rounded-pill"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {courseList.length === 0 && (
          <div className="col-12 text-center">
            <p className="text-muted">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
