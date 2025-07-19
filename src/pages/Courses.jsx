import React from 'react'
import { Link } from 'react-router-dom';


function Courses() {
  const courseList = [
    { id: 1, title: 'Full Stack Development', desc: 'HTML, CSS, JS, React, Node.js' },
    { id: 2, title: 'Python for Data Science', desc: 'Numpy, Pandas, Matplotlib, ML' },
  ];
  return (
    <>
     <div className="container py-5">
      <h2 className="mb-4">Available Courses</h2>
      <div className="row">
        {courseList.map((course) => (
          <div className="col-md-6 mb-4" key={course.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.desc}</p>
                <Link to={`/courses/${course.id}`} className="btn btn-success">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Courses