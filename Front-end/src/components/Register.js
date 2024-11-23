
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Register.css"; 

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    birthdate: "",
    phone: "",
    username: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          {/* Họ tên */}
          <div className="form-group">
            <i className="icon fa fa-user"></i>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ngày tháng năm sinh */}
          <div className="form-group">
            <i className="icon fa fa-calendar"></i>
            <DatePicker
              selected={formData.birthdate ? new Date(formData.birthdate) : null}
              onChange={(date) => setFormData({ ...formData, birthdate: date })}
              dateFormat="dd/MM/yyyy" 
              placeholderText="Ngày sinh"
            />
          </div>

          {/* Số điện thoại */}
          <div className="form-group">
            <i className="icon fa fa-phone"></i>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <i className="icon fa fa-user-circle"></i>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mật khẩu */}
          <div className="form-group">
            <i className="icon fa fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="form-group">
            <i className="icon fa fa-lock"></i>
            <input
              type="password"
              name="rePassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.rePassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nút Đăng ký */}
          <button type="submit" className="btn-register">
            Đăng ký
          </button>
        </form>

        {/* Liên kết đăng nhập */}
        <p className="login-link">
          Bạn đã có tài khoản? <Link to="/">Đăng nhập ngay!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

