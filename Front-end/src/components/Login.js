import React from "react";
import "../css/Login.css"
import homeImage from "../img/home.png"; // Đường dẫn tương đối từ file hiện tại
import { Link } from "react-router-dom"; // Import Link để chuyển trang
import Register from "./Register";

const Login = () => {
  return (
    <div className="login-container">
      <header className="header">
        <div className="logo">
          <img src={homeImage} alt="Logo" />
        </div>
        <div className="title">
          <h2>HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN</h2>
        </div>
      </header>
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form>
          {/* Tài khoản */}
          <div className="form-group">
            <i className="icon fa fa-user"></i>
            <input type="text" placeholder="Tài khoản" required />
          </div>

          {/* Mật khẩu */}
          <div className="form-group">
            <i className="icon fa fa-eye"></i>
            <input type="password" placeholder="Mật khẩu" required />
          </div>

          {/* Checkbox */}
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Nhớ đăng nhập</label>
          </div>

          {/* Nút Đăng nhập */}
          <button type="submit" className="btn-login">
            Đăng nhập
          </button>
        </form>

        {/* Đăng ký */}
        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
