import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/course");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin-all");
      // console.log(res.data.bookings)
      setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddCourse = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await API.post("/addCourse", data);
      toast.success("Course added successfully!");
      document.getElementById("closeModalBtn").click();
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        image: "",
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add course!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      image: "",
    });
  };

  const handleUpdateCourse = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await API.put(`/courseupdate/${selectedCourse._id}`, data);
      toast.success("Course updated successfully!");
      document.getElementById("closeUpdateModalBtn").click();
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    try {
      await API.delete(`/coursedelete/${selectedCourse._id}`);
      toast.success("Course deleted!");
      document.getElementById("closeDeleteModalBtn").click();
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course!");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <img
          src="https://pninfosys.com/assets/colorlogo-BagIKm6w.png"
          alt="Logo"
          style={{ height: "50px" }}
        />
      </div>

      {/* --- Manage Courses Section --- */}
      <div className="mb-4">
        <h4>Manage Courses</h4>
        <button
          className="btn btn-success mb-3"
          data-bs-toggle="modal"
          data-bs-target="#addCourseModal"
        >
          + Add New Course
        </button>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>₹{course.price}</td>
                <td>{course.duration}</td>
                <td>
                  {course.image && <img src={course.image} alt="" width="80" />}
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#updateCourseModal"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteConfirmModal"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Add Course Modal --- */}
      <div className="modal fade" id="addCourseModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Course</h5>
              <button
                type="button"
                className="btn-close"
                id="closeModalBtn"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <textarea
                className="form-control mb-2"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              ></textarea>
              <input
                type="number"
                className="form-control mb-2"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <input
                type="text"
                className="form-control mb-2"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
              />
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleAddCourse}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding...
                  </>
                ) : (
                  "Add Course"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Update Course Modal --- */}
      <div className="modal fade" id="updateCourseModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Course</h5>
              <button
                type="button"
                className="btn-close"
                id="closeUpdateModalBtn"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              <textarea
                className="form-control mb-2"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="number"
                className="form-control mb-2"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control mb-2"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-warning"
                onClick={handleUpdateCourse}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating...
                  </>
                ) : (
                  "Update Course"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Modal --- */}
      <div className="modal fade" id="deleteConfirmModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close"
                id="closeDeleteModalBtn"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete{" "}
              <strong>{selectedCourse?.title}</strong>?
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleDeleteCourse}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- All Bookings Section --- */}
      <hr className="my-5" />
      <div>
        <h4>All Course Bookings</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-info">
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Price</th>
                <th>Student</th>
                <th>Email</th>
                <th>Status</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={
                            booking.course?.image ||
                            "https://via.placeholder.com/60"
                          }
                          alt="course"
                          width="60"
                          className="rounded"
                        />
                        <div>
                          <strong>{booking.course?.title || "N/A"}</strong>
                        </div>
                      </div>
                    </td>
                    <td>₹{booking.price}</td>
                    <td>{booking.user?.name || "N/A"}</td>
                    <td>{booking.user?.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status === "Cancelled"
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {booking.status || "Confirmed"}
                      </span>
                    </td>
                    <td>{new Date(booking.bookedAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
