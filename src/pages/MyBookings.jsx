import React from 'react'

function MyBookings() {
    const bookings = [
        { id: 1, course: 'Full Stack Development', date: '2025-07-20' },
        { id: 2, course: 'Python for Data Science', date: '2025-07-21' },
      ];
  return (
    <>
    <div className="container py-5">
      <h3 className="mb-4">My Course Bookings</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Course</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.course}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default MyBookings