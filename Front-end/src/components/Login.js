import React from "react";
import styles from "../css/Login.module.css"; // Import Login.module.css
import homeImage from "../img/home.png"; // Đường dẫn tương đối từ file hiện tại
import { Link } from "react-router-dom"; // Import Link để chuyển trang

const Login = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={homeImage} alt="Logo" />
        </div>
        <div className={styles.title}>
          <h2>HỆ THỐNG QUẢN LÝ PHÒNG KHÁM TƯ NHÂN</h2>
        </div>
      </div>
      <div className={styles.loginBox}>
        <h2>Đăng nhập</h2>
        <form>
          {/* Tài khoản */}
          <div className={styles.formGroup}>
            <input type="text" placeholder="Tài khoản" required />
          </div>

          {/* Mật khẩu */}
          <div className={styles.formGroup}>
            <input type="password" placeholder="Mật khẩu" required />
          </div>

          {/* Checkbox */}
          <div className={styles.rememberMe}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Nhớ đăng nhập</label>
          </div>

          {/* Nút Đăng nhập */}
          <button type="submit" className={styles.btnLogin}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
