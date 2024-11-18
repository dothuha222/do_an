import React, { useState } from "react";
import axios from "axios"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthdate: "",
    username: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Hàm xử lý khi người dùng nhập vào các trường
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi người dùng nhấn nút "Register"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", formData);
      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      setResponseMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Số điện thoại */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Ngày sinh */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            name="birthdate"
            placeholder="Birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Username */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Nút Đăng ký */}
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>
          Register
        </button>
      </form>
      {/* Hiển thị thông báo */}
      {responseMessage && <p style={{ marginTop: "20px" }}>{responseMessage}</p>}
    </div>
  );
};

export default Register;
