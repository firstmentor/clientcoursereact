import React from 'react';
// import logo from '../assets/logo.png'; // अगर आप logo लगाना चाहें

function AdminDashboard() {
  const courses = [
    { id: 1, title: 'Full Stack Development' },
    { id: 2, title: 'Data Science Bootcamp' },
  ];

  const bookings = [
    { id: 1, course: 'Full Stack Development', student: 'Aman Sharma', email: 'aman@example.com' },
    { id: 2, course: 'Data Science Bootcamp', student: 'Priya Mehta', email: 'priya@example.com' },
  ];

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <img src="https://pninfosys.com/assets/colorlogo-BagIKm6w.png" alt="Logo" style={{ height: '50px' }} />
      </div>

      <div className="mb-4">
        <h4>Manage Courses</h4>
        <button className="btn btn-success mb-3">+ Add New Course</button>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div>
        <h4>Booked Students</h4>
        <table className="table table-bordered">
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Student Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.course}</td>
                <td>{booking.student}</td>
                <td>{booking.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
