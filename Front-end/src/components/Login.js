import React, { useState } from 'react';
import styles from "../css/Login.module.css"; // Import Login.module.css
import homeImage from "../img/home.png"; // Đường dẫn tương đối từ file hiện tại
import { Link } from "react-router-dom"; // Import Link để chuyển trang
import { checkAccount } from "./Services/NguoiDungService";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserRole, setTen, setUserId }) => {
  const [formData,setFormData] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    checkAccount(formData).then(response => {
      alert('Đăng nhập thành công!')
      console.log(response.data)

      const vai_tro = response.data.vai_tro
      setUserRole(vai_tro); // Cập nhật vai trò vào state cha (App.js)
      localStorage.setItem("userRole", vai_tro); // Lưu vai trò vào localStorage

      const ten = response.data.ten
      console.log(ten)
      localStorage.setItem('ten', ten);
      setTen(ten);

      const userId = response.data.nguoi_dung_id
      console.log(userId)
      localStorage.setItem('userId', userId);
      setUserId(userId);

      console.log(vai_tro)
      if (vai_tro === "le_tan") {
         navigate("/reception-form");
      } else if (vai_tro === "bac_si") {
        navigate("/khambenh-list");
      }
      else if (vai_tro === "benh_nhan") {
          navigate("/home");
        }
    })
    .catch(error => {
      console.error(error)
      setError("Tài khoản hoặc mật khẩu không đúng!");
    })
  };

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
            <input 
              type="text" 
              placeholder="Tài khoản" 
              name="username"
              value={formData.username}
              onChange={handleInputChange} 
              required />
          </div>

          {/* Mật khẩu */}
          <div className={styles.formGroup}>
            <input 
            type="text" 
            name='password'
            placeholder="Mật khẩu" 
            value={formData.password}
            onChange={handleInputChange}
            required />
          </div>

          {/* Nút Đăng nhập */}
          <button type="submit" className={styles.btnLogin} onClick={handleSubmit}>
            Đăng nhập
          </button>
          {error && <p className={styles.error} style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
