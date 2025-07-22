// components/ChangePassword.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/change-password', formData);
      toast.success(res.data.message);
      setFormData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
      <div className="card shadow p-4 col-md-6">
        <h4 className="mb-4 text-center">Change Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
